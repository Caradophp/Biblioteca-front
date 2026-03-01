import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import Toast from '../utils/Toast';
import AutoComplteField from '../components/AutoCompleteField';

const CadastroUsuarioExterno = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [numeroMatricula, setNumeroMatricula] = useState('');
    // const [escola, setEscola] = useState('');
    const [senhaConfirme, setSenhaConfirme] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState(null);
    const [idEscola, setIdEscola] = useState('');
    
    // Inicializar Materialize Select
    useEffect(() => {
        M.FormSelect.init(document.querySelectorAll('select'));
    }, []);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'nome') setNome(value);
        if (name === 'email') setEmail(value);
        if (name === 'senha') setSenha(value);
        if (name === 'senhaConfirme') setSenhaConfirme(value);
        if (name === 'tipoUsuario') setTipoUsuario(value);
        if (name === 'numeroMatricula') setNumeroMatricula(value);
        // if (name === 'escola') setEscola(value);
    };
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nome || !email || !senha || !senhaConfirme || !tipoUsuario || !numeroMatricula || !idEscola) {
        setErro('Por favor, preencha todos os campos.');
        return;
    } else {
        if (senha !== senhaConfirme) {
            setErro('As senhas informadas devem ser iguais');
            return;
        } else {
            setErro(null);
        }
    }

    const usuario = {
        nome,
        email,
        senha,
        tipoUsuario,
        matricula: numeroMatricula,
        escolaId: idEscola,
        // escola
    };
    
    // const token = localStorage.getItem("token"); // 🔹 Pega o token salvo no login

    try {
        const response = await fetch('http://localhost:8080/usuarios', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`, // 🔹 Adiciona o token no cabeçalho
            },
            body: JSON.stringify(usuario),
        });

        if (response.ok) {
            setErro(null);
            setMensagem('Usuário cadastrado com sucesso!');
            setTimeout(() => location.reload(), 1000);
        } else {
            const data = await response.json();
            setErro(`Erro: ${data.aviso || 'Erro desconhecido'}`);
        }
    } catch (error) {
        console.error(error);
        setErro('Erro ao conectar com a API.');
    }
};
    
    
    return (
        <div>
            <h2>Cadastro de Usuário</h2>

            {mensagem && <div className="card-panel teal lighten-2">{mensagem}</div>}
            {erro && <div className="card-panel red lighten-2">{erro}</div>}

            <form onSubmit={handleSubmit} className="col s12" id='inc-user'>
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
                <input type="password" id="senhaConfirme" name="senhaConfirme" value={senhaConfirme} onChange={handleChange} required />
                <label htmlFor="senhaConfirme" className={senhaConfirme ? 'active' : ''}>Confirme a senha</label>
                </div>


                <div className="input-field">
                <select name="tipoUsuario" id="tipoUsuario" value={tipoUsuario} onChange={handleChange} required>
                    <option value="" disabled>Escolha o tipo de usuário</option>
                    <option value="aluno">Aluno</option>
                    <option value="professor">Professor</option>
                    {/* <option value="administrador">Administrador</option> */}
                </select>
                <label>Tipo de Usuário</label>
                </div>

                <div className="input-field">
                <input type="number" id="numeroMatricula" name="numeroMatricula" value={numeroMatricula} onChange={handleChange} required />
                <label htmlFor="numeroMatricula" className={numeroMatricula ? 'active' : ''}>Número de Matrícula</label>
                </div>

                {/* <div className="input-field">
                <input type="text" name="escola" id="escola" value={escola} onChange={handleChange} required />
                <label htmlFor="escola" className={escola ? 'active' : ''}>Escola</label>
                </div> */}
                <AutoComplteField label="Escola" url="http://localhost:8080/escolas"
                labelField="nome" selectedId={idEscola} onSelect={(id) => setIdEscola(id)} requiredAuth={false}/>
            </form>
        </div>
    );
}

export default CadastroUsuarioExterno;