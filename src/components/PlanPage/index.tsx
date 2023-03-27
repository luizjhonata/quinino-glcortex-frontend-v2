import './styles.css';
import Header from '../Header';
import { Plan } from '../../model/plan';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../util/request';
import EditModalPlan from '../EditModalPlan';
import { useAuth } from '../context/AuthProvider/useAuth';
import NewPlanModal from '../NewPlanModal';

function PlanPage() {

    const auth = useAuth();

    const token = auth.token;

    const [plans, setPlans] = useState<Plan[]>([]);

    useEffect(() => {
        axios.get(`${BASE_URL}/plans`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            setPlans(response.data);
        })
    }, []);

    return (
        <div>
            <Header />
            <div className='plan-container'>
                <h1>Planos</h1>
                <table className="plan-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Minutos</th>
                            <th>Tarifa Adic.</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map(plan => (
                            <tr key={plan.id}>
                                <td>{plan.name}</td>
                                <td>{plan.freeMinutes}</td>
                                <td>{plan.additionalTariff.toFixed(2)}</td>
                                <td><EditModalPlan
                                    planName={plan.name}
                                    id={plan.id}
                                    freeMinutes={plan.freeMinutes}
                                    additionalTariff={plan.additionalTariff}
                                /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <NewPlanModal/>
            </div>
        </div>
    )
}

export default PlanPage
