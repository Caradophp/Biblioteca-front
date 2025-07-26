import React from 'react';
import M from 'materialize-css';

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
          <li><a href="/login">Login</a></li>
          <li><a href="/cadastrar">Cadastrar</a></li>
          <li><a href="/lista">Lista de Usuários</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
