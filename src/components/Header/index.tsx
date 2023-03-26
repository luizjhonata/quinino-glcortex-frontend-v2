import React from 'react'
import logo from '../../assets/logo-quinino.png'
import './styles.css';

function Header() {
  return (
    <div className='header-container'>
        <img className='logo' src={logo} alt="Logo Quinino Telefonia" />
    </div>
  )
}

export default Header