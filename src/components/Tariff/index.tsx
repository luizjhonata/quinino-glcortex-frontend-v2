import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from '../Header';
import { Tariff } from '../../model/tariff';
import axios from 'axios';
import { BASE_URL } from '../../util/request';
import EditModalTariff from '../EditModalTariff';
import { useAuth } from '../context/AuthProvider/useAuth';
import NewTariffModal from '../NewTariffModal';

function TariffPage() {

    const auth = useAuth();

    const token = auth.token;

    const [tariffs, setTariffs] = useState<Tariff[]>([]);

    function newTariff() {

    }

    useEffect(() => {
        axios.get(`${BASE_URL}/tariffs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(response => {
            setTariffs(response.data);
        })
    }, []);

    return (
        <div>
            <Header />
            <div className='tariff-container'>
                <div className='title-tariff'>
                    <h1>Tarifas</h1>
                </div>
                <table className="taiff-table">
                    <thead>
                        <tr>
                            <th>Origem</th>
                            <th>Destino</th>
                            <th>Preço por Min</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tariffs.map(tariff => (
                            <tr key={tariff.id}>
                                <td >{tariff.origin}</td>
                                <td>{tariff.destiny}</td>
                                <td >R$ {tariff.pricePerMinute.toFixed(2)}</td>
                                <td><EditModalTariff
                                    id={tariff.id}
                                    origin={tariff.origin}
                                    destiny={tariff.destiny}
                                    pricePerMinute={tariff.pricePerMinute}
                                />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                <NewTariffModal/>
            </div>
        </div>
    )
}

export default TariffPage
