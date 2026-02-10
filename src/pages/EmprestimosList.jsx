import CrudComponent from "../components/CrudComponent";
import { useEffect, useState } from "react";
import Toast from "../utils/Toast";
import M from "materialize-css";
import AutoCompleteField from "../components/AutoCompleteField";

const EmprestimosList = () => {

    const [emprestimos, setEmprestimos] = useState([]);
    const [erro, setErro] = useState(null);
    const [id, setId] = useState('')
    const [modoModal, setModoModal] = useState('add');
    const [idLivro, setIdLivro] = useState(null);
    const [idUsuario, setIdUsuario] = useState(null);
    const [busca, setBusca] = useState('');
    
     const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'idLivro') setIdLivro(value);
        if (name === 'idUsuario') setIdUsuario(value);
     }

    function openInc() {
        const elem = document.getElementById("modal1");
        const instance = M.Modal.getInstance(elem);
        instance.open();
        setModoModal('add');
        setIdLivro(null);
        setIdUsuario(null);
    }

    function abrirModal(item) {
        setId(item.id);
        const elem = document.getElementById("modalConfirme");
        const instance = M.Modal.getInstance(elem);
        instance.open();
    }

    function limparCampos() {
        document.getElementById("inc").reset();
        setIdLivro(null);
        setIdUsuario(null);
    }

    async function salvar(e) {
        e.preventDefault();
        
        if (!idLivro || !idUsuario) {
            Toast.error("Por favor, preencha todos os campos.");
            return;
        }


        const response = await fetch("http://localhost:8080/emprestimos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                idLivro,
                idUsuario
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            Toast.error("Erro ao salvar empréstimo: " + errorData.message);
            return;
        }

        Toast.success("Empréstimo registrado com sucesso!");
        setIdLivro(null);
        setIdUsuario(null);
        const elem = document.getElementById("modal1");
        const instance = M.Modal.getInstance(elem);
        instance.close();
        buscarEmprestimos();
    }

    async function buscarEmprestimos() {
        try {
            const fetchEmprestimos = async () => {
                const response = await fetch("http://localhost:8080/emprestimos", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const livrosResponse = await fetch("http://localhost:8080/livros", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const usuariosResponse = await fetch("http://localhost:8080/usuarios", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const livrosObj = {}
                const usuariosObj = {}
                const dataLivros = await livrosResponse.json();
                const dataUsuarios = await usuariosResponse.json();

                const elemLivro = document.getElementById("tituloLivro");
                M.Autocomplete.init(elemLivro, {
                    data: dataLivros.reduce((acc, livro) => {
                        acc[livro.titulo] = null;
                        livrosObj[livro.titulo] = livro.id;
                        return acc;
                    }, {}),
                    onAutocomplete: (tituloSelecionado) => {
                        const idSelecionado = livrosObj[tituloSelecionado];
                        setIdLivro(idSelecionado);
                        console.log("Livro selecionado:", tituloSelecionado, "ID:", idSelecionado);
                    }
                });

                const elemUsuario = document.getElementById("nomeUsuario");
                M.Autocomplete.init(elemUsuario, {
                    data: dataUsuarios.reduce((acc, usuario) => {
                        acc[usuario.nome] = null;
                        usuariosObj[usuario.nome] = usuario.id;
                        return acc;
                    }, {}),
                    onAutocomplete: (nomeSelecionado) => {
                        const idSelecionado = usuariosObj[nomeSelecionado];
                        setIdUsuario(idSelecionado);
                        console.log("Usuário selecionado:", nomeSelecionado, "ID:", idSelecionado);
                    }
                });


                if (!response.ok) {
                    throw new Error("Erro ao buscar emprestimos");
                }

                const data = await response.json();
                setEmprestimos(data);
            };

            fetchEmprestimos();
        } catch (error) {
            Toast.error("Erro ao buscar emprestimos: " + error.message);
        }
    }

    async function buscar() {
        Toast.info("Funcionalidade de buscar empréstimos ainda não implementada.");
    }

    async function editar() {
        Toast.info("Funcionalidade de editar empréstimo ainda não implementada.");
    }
    
    async function excluir() {
        const response = await fetch(`http://localhost:8080/emprestimos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            Toast.error("Erro ao excluir empréstimo: " + errorData.message);
            return;
        }

        Toast.success("Empréstimo excluído com sucesso!");
        buscarEmprestimos();
    }

    async function pesquisar() {
        Toast.info("Funcionalidade de pesquisar empréstimos ainda não implementada.");
    }

    useEffect(() => {
        buscarEmprestimos();
    }, []);

    return (
        <div>
            <h2>Lista de Empréstimos</h2>
            <CrudComponent 
                data={emprestimos}
                onAdd={() => openInc()}
                onEdit={() => alert("Editar empréstimo - Funcionalidade não implementada")}
                onDelete={() => excluir()}
                onDetails={() => alert("Detalhes do empréstimo - Funcionalidade não implementada")}
                onSearch={() => pesquisar()}
                fields={["id", "tituloLivro", "nomeUsuario"]}
                heads={["ID", "Título do Livro", "Nome do Usuário"]}
                openModal={(item) => abrirModal(item)}
            />
            <div id="modal1" className="modal">
                <div className="modal-content">
                    <h4>Registrar novo Empréstimo</h4>
                    <form id="inc" onSubmit={salvar}>
                        <AutoCompleteField 
                            label="Título do Livro"
                            url="http://localhost:8080/livros"
                            labelField="titulo"
                            onSelect={(id) => setIdLivro(id)}
                        />
                        <AutoCompleteField 
                            label="Nome do Usuário"
                            url="http://localhost:8080/usuarios"
                            labelField="nome"
                            onSelect={(id) => setIdUsuario(id)}
                        />
                    </form>
                </div>
                <div className="modal-footer fixed-footer">
                    <button className="btn waves-effect waves-light modal-close" onClick={() => limparCampos()}>Cancelar</button>
                    <button className="btn waves-effect waves-light" type="submit" form="inc">Salvar</button>
                </div>
            </div>
        </div>
    );
};

export default EmprestimosList;