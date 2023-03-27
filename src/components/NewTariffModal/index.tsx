import React, { useState } from 'react';
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

function NewTariffModal() {

    const [modalIsOpen, setIsOpen] = React.useState(false);

    const [tariffOrigin, setTariffOrigin] = useState<string>();
    const [tariffDestiny, setTariffDestiny] = useState<string>();
    const [tariffPrice, setTariffPrice] = useState<number>();

    const auth = useAuth();

    const token = auth.token;

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        const newTariff = { origin: tariffOrigin, destiny: tariffDestiny, pricePerMinute: tariffPrice };
        axios.post(`${BASE_URL}/tariffs`, newTariff, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                console.log(response.data); // Verificar os dados no console
                closeModal(); // Fecha o modal após a atualização
            })
            .catch(error => {
                console.log(error); // 
            });
    }

    return (
        <div >
            <button className='nova-tarifa' onClick={openModal}>Nova Tarifa</button>
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
                                <h2>ORIGEM:</h2>
                                <input
                                    type="text"
                                    id="tariffOrigin"
                                    name="tariffOrigin"
                                    value={tariffOrigin}
                                    onChange={(event) => setTariffOrigin(event.target.value)}
                                />
                            </label>
                            <label className='field-modal'>
                                <h2>DESTINO:</h2>
                                <input
                                    type="text"
                                    id="tariffDestiny"
                                    name="tariffDestiny"
                                    value={tariffDestiny}
                                    onChange={(event) => setTariffDestiny(event.target.value)}
                                />
                            </label>
                            <label className='field-modal'>
                                <h2>PREÇO POR MINUTO:</h2>
                                <input
                                    type="number"
                                    step="0.01"
                                    id="tariffPrice"
                                    name="tariffPrice"
                                    value={tariffPrice}
                                    onChange={(event) => setTariffPrice(Number(event.target.value))}
                                />
                            </label>
                            <div className='container-save-button'>
                                <button
                                    className='save-button'
                                    type='submit'
                                > Salvar Tarifa </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal >
        </div >
    )
}

export default NewTariffModal