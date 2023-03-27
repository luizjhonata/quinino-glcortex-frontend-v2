import React, { useState } from 'react';
import edit from '../../assets/edit.svg';
import Modal from 'react-modal';
import './styles.css';
import axios from "axios"
import { BASE_URL } from '../../util/request';
import { useAuth } from '../context/AuthProvider/useAuth';

const customStyles = {
    content: {
        margin: '50px 11px 50px 11px',
        paddingTop: '20px',
        height: 'fit-content',
        inset: 'inherit',
    },
};

Modal.setAppElement('#root')

interface EditModalPlanProps {
    id: number;
    planName: string;
    freeMinutes: number;
    additionalTariff: number;
}

function EditModalPlan({ planName, freeMinutes, additionalTariff, id }: EditModalPlanProps) {

    const [modalIsOpen, setIsOpen] = React.useState(false);

    const [name, setName] = useState<string>(planName);
    const [minutes, setMinutes] = useState<number>(freeMinutes);
    const [tarifa, setTarifa] = useState<number>(additionalTariff);
    const [planId, setPlanId] = useState<number>(id);

    const auth = useAuth();

    const token = auth.token;

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        const updatePlan = { id: planId, name: name, freeMinutes: minutes, additionalTariff: tarifa };
        axios.put(`${BASE_URL}/plans`, updatePlan, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                console.log(response.data); // Verificar os dados no console
                closeModal(); // Fecha o modal após a atualização
            })
            .catch(error => {
                console.log(error); // 
            });
    }

    function deletePlan() {
        try {

            axios.delete(`${BASE_URL}/plans/${planId}`, { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    console.log(response.data);
                });
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div >
            <img src={edit} alt="Ver Detalhes" onClick={openModal} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div className='container-modal'>
                    <div className='edit-content'>
                        <div className='container-close-button'>
                            <button className='close-button' onClick={closeModal}>X</button>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <label className='field-modal'>
                                <h2>NOME:</h2>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)} />
                            </label>
                            <label className='field-modal'>
                                <h2>MINUTOS:</h2>
                                <input
                                    type="number"
                                    id="freeMinutes"
                                    name="freeMinutes"
                                    value={minutes}
                                    onChange={(event) => setMinutes(Number(event.target.value))} />
                            </label>
                            <label className='field-modal'>
                                <h2>TARIFA ADICIONAL:</h2>
                                <input
                                    type="number"
                                    id="additionalTariff"
                                    name="additionalTariff"
                                    value={tarifa}
                                    onChange={(event) => setTarifa(Number(event.target.value))} />
                            </label>
                            <div className='container-save-button'>
                                <button
                                    className='save-button'
                                    type='submit'
                                > Salvar Alterações </button>
                                <button className='save-button' onClick={deletePlan}> Excluir </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal >
        </div >
    )
}

export default EditModalPlan