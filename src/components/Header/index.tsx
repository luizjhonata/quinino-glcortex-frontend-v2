import React, { useState } from 'react'
import logo from '../../assets/logo-quinino.png';
import './styles.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider/useAuth';

function Header() {

  const auth = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    try {
        auth.logout();
        navigate("/");
    } catch (error) {
        console.log('Erro no Logout');
    }
}

  return (
    <div className='header-container'>
      <div>
        <img className='logo' src={logo} alt="Logo Quinino Telefonia" />
      </div>
      {auth.token ? (
        <div>
          <div className='navegar'>
            <div className='links-nav'>
              <Link to="/">HOME</Link>
            </div>
            <div className='links-nav'>
              <Link to="/plan">PLANOS</Link>
            </div>
            <div className='links-nav'>
              <Link to="/tariff">TARIFAS</Link>
            </div>
          </div>
          <div>
            <button className='logoutbutton' onClick={handleLogout}>sair</button>
          </div>
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  )
}

export default Header