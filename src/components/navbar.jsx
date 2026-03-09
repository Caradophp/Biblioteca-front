import React, { useRef, useState } from 'react';
import M from 'materialize-css';
import { hasRole } from '../utils/Auth';
import { Navigate } from 'react-router-dom';
import Toast from '../utils/Toast';
import NotificationPanel from './panels/NotificationPanel';

const Navbar = () => {
  React.useEffect(() => {
    M.AutoInit(); // Inicia automaticamente os componentes JS do Materialize
  }, []);

  const tabsRef = useRef(null);

  const logout = () => {
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  function openNotifications() {
    document.getElementById('off-canvas').classList.toggle('open');
  }

  React.useEffect(() => {
    if (tabsRef.current) {
      const instance = M.Tabs.getInstance(tabsRef.current);
      instance.updateTabIndicator();
    }
  }, []);

  return (
    <nav>
      <div className="nav-wrapper blue">
        <a href="#" className="brand-logo center">Sistema de Reservas</a>
        <ul className="left hide-on-med-and-down">
          <li><a href="/home">Home</a></li>
          {hasRole(['administrador']) && <li><a href="/cadastrar">Cadastrar</a></li>}
          {hasRole(['administrador']) && <li><a href="/lista">Lista de Usuários</a></li>}
          <li><a href="/livros">Livros</a></li>
          <li><a href="/emprestimos">Emprétimos</a></li>
          {hasRole(['administrador']) && <li><a href="/escolas">Escolas</a></li>}
          <li><a onClick={logout}>Sair</a></li>
        </ul>
        <ul className="right hide-on-med-and-down" style={{marginRight: '10px', cursor: 'pointer'}} onClick={openNotifications} title='Notificações'>
          <li><i className='material-icons'>notifications_none</i></li>
        </ul>
      </div>
        <NotificationPanel />
    </nav>
  );
};

export default Navbar;
