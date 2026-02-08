import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { color } from 'chart.js/helpers';

const LoginUsuario = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

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

      // Redirecionar para a página de cadastro
      window.location.href = '/home';

    } catch (error) {
      console.error("Erro:", error);
      setMensagem('Erro ao conectar com a API. Verifique suas credenciais.');
    }
  };

  return (
    <div style={{backgroundColor: '#525050ff', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', padding: '20px', marginTop: '50px', maxWidth: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
            Esqueceu senha <a href="#modal1" className="modal-trigger">Clique aqui</a>
          </div>
        </form>
        <section style={{marginTop: '20px', textAlign: 'center', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', width: '100%', boxSizing: 'border-box'}}>
            <p>Ainda não tem uma conta? <a href="/cadastrar">Cadastre-se aqui</a></p>
        </section>
      </div>
      <div id="modal1" className="modal">
        <div className="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
        </div>
      </div>
    </div>
  );
};

export default LoginUsuario;
