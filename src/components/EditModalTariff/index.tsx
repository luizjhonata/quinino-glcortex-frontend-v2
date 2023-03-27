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
    origin: string;
    destiny: string;
    pricePerMinute: number;
}

function EditModalTariff({ origin, destiny, pricePerMinute, id }: EditModalPlanProps) {

    const [modalIsOpen, setIsOpen] = React.useState(false);

    const [tariffOrigin, setTariffOrigin] = useState<string>(origin);
    const [tariffDestiny, setTariffDestiny] = useState<string>(destiny);
    const [tariffPrice, setTariffPrice] = useState<number>(pricePerMinute);
    const [tariffId, setTariffId] = useState<number>(id);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    const auth = useAuth();

    const token = auth.token;

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        const updateTariff = { id: tariffId, origin: tariffOrigin, destiny: tariffDestiny, pricePerMinute: tariffPrice };
        axios.put(`${BASE_URL}/tariffs`, updateTariff, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                console.log(response.data); // Verificar os dados no console
                closeModal(); // Fecha o modal após a atualização
            })
            .catch(error => {
                console.log(error); // 
            });
    }

    function deleteTariff() {
        try {

            axios.delete(`${BASE_URL}/tariffs/${tariffId}`,  { headers: { Authorization: `Bearer ${token}` } })
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
                                <h2>DESTINO: </h2>
                                <input
                                    type="text"
                                    id="tariffDestiny"
                                    name="tariffDestiny"
                                    value={tariffDestiny}
                                    onChange={(event) => setTariffDestiny(event.target.value)} />
                            </label>
                            <label className='field-modal'>
                                <h2>PREÇO POR MINUTO:</h2>
                                <input
                                    type="number"
                                    id="tariffPrice"
                                    name="tariffPrice"
                                    value={tariffPrice}
                                    onChange={(event) => setTariffPrice(Number(event.target.value))}
                                />
                            </label>
                            <div className='container-save-button'>
                                <button
                                    className='save-button'
                                    type='submit'> Salvar Alterações </button>
                                <button className='save-button' onClick={deleteTariff}> Excluir </button>
                            </div>
                        </form>
                    </div>
                </div>

            </Modal >
        </div >
    )
}

export default EditModalTariff