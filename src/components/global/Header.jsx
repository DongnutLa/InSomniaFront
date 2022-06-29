import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

//import Login from '@containers/Login';
//import Signup from '@containers/Signup';
import AuthContext from '@context/AuthContext';

import '@styles-components/Header.scss';

import logo from '@icons/insomniacolLogo.png';
import menu from '@icons/menu.svg';

const Header = () => {
  const navigate = useNavigate();

  const { deleteAuthData, userData, isAuthenticated, userPermissions } = useContext(AuthContext);

  const onLogout = () => {
    deleteAuthData();
    navigate('/');
  }

  return (
    <header>
    <nav>
      <img src={logo} alt="Dreamcatcher Colombia" />
      <div className="navbar">
        <ul className="nav__left">
          <li onClick={() => navigate('/')}><a>Inicio</a></li>
          <li onClick={() => navigate('/dreamcatcher')}><a>Dreamcatcher</a></li>
          <li onClick={() => navigate('/fanclub')}><a>Fanclub</a></li>
        </ul>
        <ul className="nav__right">
          {!isAuthenticated && (
            <>
              <li onClick={() => navigate('/login')}><a>Iniciar sesión</a></li>
              <li onClick={() => navigate('/signup')}><a>Registrarse</a></li>
            </>
          )}
          {isAuthenticated && (
            <>
              <li><a>{userData.username}</a></li>
              <li><a href="" onClick={onLogout}>Logout</a></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  </header>
  );
}

export default Header;