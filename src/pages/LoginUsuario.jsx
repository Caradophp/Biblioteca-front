import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

const LoginUsuario = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    M.FormSelect.init(document.querySelectorAll('select'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nome') setNome(value);
    if (name === 'senha') setSenha(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/usuarios/login?nome=${encodeURIComponent(nome)}&senha=${encodeURIComponent(senha)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Credenciais inválidas ou erro na API');
      }

      // Tenta converter para JSON
      const data = await response.json();
      localStorage.setItem('token', data.token);

      // Redirecionar para a página de cadastro
      window.location.href = '/cadastrar';

    } catch (error) {
      console.error("Erro:", error);
      setMensagem('Erro ao conectar com a API. Verifique suas credenciais.');
    }
  };

  return (
    <div className="container">
      <h2>Login de Usuário</h2>

      {mensagem && <div className="card-panel red lighten-2">{mensagem}</div>}

      <form onSubmit={handleSubmit} className="col s12">
        <div className="input-field">
          <input type="text" id="nome" name="nome" value={nome} onChange={handleChange} required />
          <label htmlFor="nome" className={nome ? 'active' : ''}>Nome</label>
        </div>

        <div className="input-field">
          <input type="password" id="senha" name="senha" value={senha} onChange={handleChange} required />
          <label htmlFor="senha" className={senha ? 'active' : ''}>Senha</label>
        </div>

        <button type="submit" className="btn waves-effect waves-light">Login</button>
        <h6>OBS.: ainda não tem conta? Solicite seu <a href="">cadastro aqui</a></h6>
      </form>
    </div>
  );
};

export default LoginUsuario;
