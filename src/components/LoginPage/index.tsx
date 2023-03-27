import './styles.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../Header';
import { useAuth } from '../context/AuthProvider/useAuth';

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        onFinish({email, password})
    };

    async function onFinish(values: {email: string, password: string }) {
        try {
            await auth.authenticate(values.email, values.password);
            if (auth.authenticate != null ) {
                navigate("/plan");
            }
        } catch (error) {
            toast.error('Invalid username or password',
                {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
        }
    }
    return (
        <div>
            <Header />
            <div className='logincontainer'>
                <div className='loginbox'>
                    <div className='logincontent'>
                        <form className='form' onSubmit={handleSubmit}>
                            <div className='field'>
                                <label htmlFor="username">Email</label>
                                <input type="username"
                                    name='username'
                                    id="username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} placeholder="Digite o email" />
                            </div>
                            <div className='field'>
                                <label htmlFor="password">Senha</label>
                                <input type="password"
                                    name='password'
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} placeholder="Digite a senha" />
                            </div>
                            <div className='btn-container'>
                                <button className="btn-entrar" type="submit">
                                    ENTRAR
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage