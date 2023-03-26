import axios from 'axios';
import { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../../util/request';
import './styles.css';
import Select from 'react-select';


function MainPage() {

    const [origin, setOrigin] = useState("");
    const [destiny, setDestiny] = useState("");
    const [plan, setPlan] = useState("");
    const [time, setTime] = useState("");

    const [costWithPlan, setCostWithPlan] = useState();
    const [costWithoutPlan, setCostWithoutPlan] = useState();

    const handleCalc = async () => {
        if (origin == "" || destiny == "" || 
            plan == "" || time == "") {
            toast.error("Insira todos os dados",
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
        } else {
        try {
                const response = await axios.get(`${BASE_URL}/costcalls?origin=${origin}&destiny=${destiny}&time=${time}&planId=${plan}`)
                    .then(response => {
                        const { costWithPlan, costWithoutPlan } = response.data;
                        setCostWithPlan(costWithPlan.toFixed(2));
                        setCostWithoutPlan(costWithoutPlan.toFixed(2));
                    })
            
        } catch (error: any) {
            const message = error.response.data.message;
            toast.error(message,
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
            console.log(message);
        };}
    }
    return (
        <div className='mainpage-container'>
            <div className='title'>
                <h1>
                    Calcule o custo de suas chamadas
                </h1>
            </div>
            <div className='calc'>
                <div className='info-select'  >
                    <p>Selecione DDD de origem: </p>
                    <select
                        value={origin}
                        onChange={(e) =>
                            setOrigin(e.target.value)}
                        id="selectMenu"
                    >
                        <option value="">Origem</option>
                        <option value="011">011</option>
                        <option value="016">016</option>
                        <option value="017">017</option>
                        <option value="018">018</option>
                    </select>
                </div>
                <div className='info-select'>
                    <p>Selecione DDD de destino: </p>

                    <select
                        value={destiny}
                        onChange={(e) =>
                            setDestiny(e.target.value)}
                        id="selectMenu"
                    >
                        <option value="">Destino</option>
                        <option value="011">011</option>
                        <option value="016">016</option>
                        <option value="017">017</option>
                        <option value="018">018</option>
                    </select>
                </div>
                <div className='info-select'>
                    <p>Tempo da chamada em minutos:</p>
                    <input placeholder='Tempo'
                        type="number"
                        min="0"
                        step="0.01"
                        value={time}
                        onChange={(e) =>
                            setTime(e.target.value)}
                    ></input>
                </div>
                <div className='info-select'>
                    <p>Selecione o seu plano:</p>
                    <select
                        value={plan}
                        onChange={(e) =>
                            setPlan(e.target.value)}
                        id="selectMenu"
                    >
                        <option value="">Plano</option>
                        <option value="1">Fale Mais 30</option>
                        <option value="2">Fale Mais 60</option>
                        <option value="3">Fale Mais 120</option>
                    </select>
                </div>
                <div className='result'>
                    <h2>O custo da chamada sem o plano é: R$ {costWithoutPlan}</h2>
                    <h2>O custo da chamada com o plano é: R$ {costWithPlan}</h2>
                </div>
                <div className='btn-container'>
                    <button className="btn-calc" onClick={handleCalc} >CALCULAR CUSTOS</button>
                </div>
            </div>
        </div>
    )
}

export default MainPage