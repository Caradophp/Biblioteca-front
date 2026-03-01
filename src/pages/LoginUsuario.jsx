import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { color } from 'chart.js/helpers';
import ModalRecuperacao from '../components/ModalRecuperacao';
import Loader from '../components/Loader';
import CadastroUsuarioExterno from '../components/CadastroUsuarioExterno';
import { jwtDecode } from 'jwt-decode';

const LoginUsuario = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [login, setLogin] = useState(true);
  const [cadastro, setCadastro] = useState(false);

  useEffect(() => {
    M.FormSelect.init(document.querySelectorAll('select'));
    M.Modal.init(document.querySelectorAll('.modal'));
    if (localStorage.getItem('token')) {
      window.location.href = '/home';
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'nome') setNome(value);
    if (name === 'senha') setSenha(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !senha) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    } else {
      setMensagem('');
    }

    try {
      const response = await fetch(
        `http://localhost:8080/usuarios/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ nome, senha })
        }
      );

      if (!response.ok) {
        throw new Error('Credenciais inválidas ou erro na API');
      }

      // Tenta converter para JSON
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('id_usuario', data.idUsuarioLogado)

      const decoded = jwtDecode(data.token);
      localStorage.setItem('role', decoded.role); 

      // Redirecionar para a página de cadastro
      window.location.href = '/home';

    } catch (error) {
      console.error("Erro:", error);
      setMensagem('Erro ao conectar com a API. Verifique suas credenciais.');
    }
  };

  const changeForm = () => {
    if (login) {
      setLogin(false)
      setCadastro(true)
    } else {
      setLogin(true)
      setCadastro(false)
    }
  }

  return (
    <div style={{backgroundColor: '#525050ff', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      {carregando && <Loader />}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '20px', marginTop: '50px', maxWidth: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {login && <div>
          <h2>Login de Usuário</h2>

          {mensagem && <div className="card-panel red lighten-2">{mensagem}</div>}

          <form onSubmit={handleSubmit} className="col s12">
            <div className="input-field">
              <input type="text" id="nome" name="nome" value={nome} onChange={handleChange}  />
              <label htmlFor="nome" className={nome ? 'active' : ''}>Nome</label>
            </div>

            <div className="input-field">
              <input type="password" id="senha" name="senha" value={senha} onChange={handleChange}  />
              <label htmlFor="senha" className={senha ? 'active' : ''}>Senha</label>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center', alignItems: 'center'}}>
              <button type="submit" className="btn waves-effect waves-light center-align">Login</button>
              Esqueceu senha? <a href="#modalRecuperacao" className="modal-trigger">Clique aqui</a>
            </div>
          </form>
          <section style={{marginTop: '20px', textAlign: 'center', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box'}}>
              <p>Ainda não tem uma conta? <button onClick={changeForm}>Cadastre-se aqui</button></p>
          </section>
        </div>}
        {cadastro && 
          <>
            <CadastroUsuarioExterno />
            <section className='between-panel'>
              <button type="submit" className="btn waves-effect waves-light" form='inc-user'>Cadastrar</button>
              <button className='btn waves-effect' onClick={changeForm}>Voltar</button>
            </section>
          </>
        }
      </div>
      <ModalRecuperacao />
    </div>
  );
};

export default LoginUsuario;
