import React from 'react';
import M from 'materialize-css';
import { hasRole } from '../utils/Auth';

const Navbar = () => {
  React.useEffect(() => {
    M.AutoInit(); // Inicia automaticamente os componentes JS do Materialize
  }, []);

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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
