import React, { useState, useEffect } from 'react';
import M from 'materialize-css';

const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [numeroMatricula, setNumeroMatricula] = useState('');
  const [escola, setEscola] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Inicializar Materialize Select
  useEffect(() => {
    M.FormSelect.init(document.querySelectorAll('select'));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nome') setNome(value);
    if (name === 'email') setEmail(value);
    if (name === 'senha') setSenha(value);
    if (name === 'tipoUsuario') setTipoUsuario(value);
    if (name === 'numeroMatricula') setNumeroMatricula(value);
    if (name === 'escola') setEscola(value);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const usuario = {
    nome,
    email,
    senha,
    tipo_usuario: tipoUsuario,
    numero_matricula: numeroMatricula,
    escola
  };

  const token = localStorage.getItem("token"); // 🔹 Pega o token salvo no login

  try {
    const response = await fetch('http://localhost:8080/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // 🔹 Adiciona o token no cabeçalho
      },
      body: JSON.stringify(usuario),
    });

    if (response.ok) {
      setMensagem('Usuário cadastrado com sucesso!');
    } else {
      const data = await response.json();
      setMensagem(`Erro: ${data.message || 'Erro desconhecido'}`);
    }
  } catch (error) {
    console.error(error);
    setMensagem('Erro ao conectar com a API.');
  }
};

  return (
    <div className="container">
      <h2>Cadastro de Usuário</h2>

      {mensagem && <div className="card-panel teal lighten-2">{mensagem}</div>}

      <form onSubmit={handleSubmit} className="col s12">
        <div className="input-field">
          <input type="text" id="nome" name="nome" value={nome} onChange={handleChange} required />
          <label htmlFor="nome" className={nome ? 'active' : ''}>Nome</label>
        </div>

        <div className="input-field">
          <input type="email" id="email" name="email" value={email} onChange={handleChange} required />
          <label htmlFor="email" className={email ? 'active' : ''}>Email</label>
        </div>

        <div className="input-field">
          <input type="password" id="senha" name="senha" value={senha} onChange={handleChange} required />
          <label htmlFor="senha" className={senha ? 'active' : ''}>Senha</label>
        </div>

        <div className="input-field">
          <select name="tipoUsuario" id="tipoUsuario" value={tipoUsuario} onChange={handleChange} required>
            <option value="" disabled>Escolha o tipo de usuário</option>
            <option value="aluno">Aluno</option>
            <option value="professor">Professor</option>
            <option value="administrador">Administrador</option>
          </select>
          <label>Tipo de Usuário</label>
        </div>

        <div className="input-field">
          <input type="number" id="numeroMatricula" name="numeroMatricula" value={numeroMatricula} onChange={handleChange} required />
          <label htmlFor="numeroMatricula" className={numeroMatricula ? 'active' : ''}>Número de Matrícula</label>
        </div>

        <div className="input-field">
          <input type="text" name="escola" id="escola" value={escola} onChange={handleChange} required />
          <label htmlFor="escola" className={escola ? 'active' : ''}>Escola</label>
        </div>

        <button type="submit" className="btn waves-effect waves-light">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroUsuario;
