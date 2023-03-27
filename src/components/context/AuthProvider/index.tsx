import { createContext, useState, useEffect } from 'react'
import { IAuthProvider, IContext, IUser } from './types'
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from './util'
// NOSSO AuthContext TERÁ UM CONTEXTO COM A INTERFACE IContext e seu valor inicial vai ser um objeto vazio do formato IContext com ele já podemos dar e receber valores

export const AuthContext = createContext<IContext>({} as IContext)

// IRÁ ficar envolta da aplicação e irá controlar quem fizer login e logout
export const AuthProvider = ({ children }: IAuthProvider) => {
    //Usuário que estará logado, pode ser tipo IUser ou Nulo
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        //busca se temos dados no LocalStorage
        const user = getUserLocalStorage();
        //se tivermos dados ele faz o set em nosso estado
        if (user) {
            setUser(user);
        }
    }, [])

    async function authenticate(email: string, password: string) {
        //response aguarda LoginRequest 
        const response = await LoginRequest(email, password);

        //Tendo sucesso vai receber o token e o username do usuário
        const payload = { token: response.token, email };

        //Alimenta o estado user acima com a resposta do payload
        setUser(payload);
        //Alimenta o LocalStorage
        setUserLocalStorage(payload);
    }

    // const navigate = useNavigate();

    function logout() {
        //Quando faço logout zero todas as informações do estado user para null
        setUser(null);
        //Remove as informações do LocalStorage
        setUserLocalStorage(null);
        // navigate("/login");
    }

    return (
        //Diz que seu AuthContext vai retornar um children e é obrigado a passar um value(valores que estão disponíveis a qualquer aplicação que estiver com o AuthContext em volta)
        <AuthContext.Provider value={{ ...user, authenticate, logout }}>
            {children}
        </AuthContext.Provider>
    )
}