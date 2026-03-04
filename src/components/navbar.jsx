import React from 'react';
import M from 'materialize-css';
import { hasRole } from '../utils/Auth';
import { Navigate } from 'react-router-dom';

const Navbar = () => {
  React.useEffect(() => {
    M.AutoInit(); // Inicia automaticamente os componentes JS do Materialize
  }, []);

  const logout = () => {
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  return (
    <nav>
      <div className="nav-wrapper blue">
        <a href="#" className="brand-logo center">Sistema de Reservas</a>
        <ul className="left hide-on-med-and-down">
          <li><a href="/">Home</a></li>
          {hasRole(['administrador']) && <li><a href="/cadastrar">Cadastrar</a></li>}
          {hasRole(['administrador']) && <li><a href="/lista">Lista de Usuários</a></li>}
          <li><a href="/livros">Livros</a></li>
          <li><a href="/emprestimos">Emprétimos</a></li>
          <li><a href="/escolas">Escolas</a></li>
          <li><a onClick={logout}>Sair</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
