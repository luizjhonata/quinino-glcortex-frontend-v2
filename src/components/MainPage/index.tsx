import axios from 'axios';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Plan } from '../../model/plan';
import { BASE_URL } from '../../util/request';
import Header from '../Header';
import './styles.css';


function MainPage() {

    const [origin, setOrigin] = useState("");
    const [destiny, setDestiny] = useState("");
    const [planList, setPlanList] = useState<Plan[]>([]);
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

    useEffect (() => {

        const plansLoad = planList;
        axios.get(`${BASE_URL}/plans`)
        .then(respose => {
            setPlanList(respose.data)
        })

    }, []);
    return (
        <div className='mainpage-container'>
            <Header/>
            <div className='title'>
                <h1>
                    Calcule o custo de suas chamadas
                </h1>
            </div>
            <div className='calc'>
                <div className='info-select'  >
                    <p>Selecione DDD de origem: </p>
                    <input placeholder='DDD'
                    type="text"
                    value={origin}
                    onChange={(e) =>
                        setOrigin(e.target.value)}
                    >
                    </input>
                </div>
                <div className='info-select'>
                    <p>Selecione DDD de destino: </p>
                    <input placeholder='DDD'
                    type="text"
                    value={destiny}
                    onChange={(e) =>
                        setDestiny(e.target.value)}
                    >
                    </input>
                </div>
                <div className='info-select'>
                    <p>Tempo da chamada(min):</p>
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
                        {planList.map(plan =>(
                        <option key={plan.id } value={plan.id}>{plan.name}</option>
                        ))}
                    </select>
                </div>
                <div className='result'>
                    <h2>Custo da chamada sem o plano: R$ {costWithoutPlan}</h2>
                    <h2>Custo da chamada com o plano: R$ {costWithPlan}</h2>
                </div>
                <div className='btn-container'>
                    <button className="btn-calc" onClick={handleCalc} >CALCULAR CUSTOS</button>
                </div>
            </div>
        </div>
    )
}

export default MainPage