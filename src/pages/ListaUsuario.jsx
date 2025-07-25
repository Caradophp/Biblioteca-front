import React, { useState, useEffect } from "react";

const ListarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token"); // 🔹 Pega o token do localStorage
        if (!token) {
          throw new Error("Usuário não autenticado.");
        }

        const response = await fetch("http://localhost:8080/usuarios", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🔹 Envia o token no cabeçalho da requisição
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar usuários");
        }

        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        setErro(error.message);
      }
    };

    fetchUsuarios();
  }, []);

  function AutoCompleteInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    fetch("https://localhost:8080/usuarios") // 👉 Altere para sua URL real
      .then(res => res.json())
      .then(data => {
        // Transforma o array em objeto para o autocomplete
        const autoData = {};
        data.forEach(item => {
          autoData[item.nome] = null; // Ou adicione imagem aqui se quiser
        });

        // Inicializa o autocomplete
        const options = { data: autoData };
        const instance = window.M.Autocomplete.init(inputRef.current, options);

        return () => instance.destroy(); // Limpa ao desmontar
      })
      .catch(err => console.error("Erro ao carregar autocomplete:", err));
  }, []);


  return (
    <div className="container">
      <h2 className="center-align">Lista de Usuários</h2>

      {erro && <p className="red-text">{erro}</p>}

      <div className="row">
        <div className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">textsms</i>
              <input type="text" id="nome-input" className="autocomplite"/>
              <label htmlFor="nome-input">Nome</label>
            </div>
          </div>
        </div>
      </div>

      <table className="striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo de Usuário</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.tipo_usuario}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="center-align">Nenhum usuário encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListarUsuarios;
