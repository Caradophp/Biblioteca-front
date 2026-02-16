import CrudComponent from "../components/CrudComponent";
import { useEffect, useRef, useState } from "react";
import Toast from "../utils/Toast";
import M from "materialize-css";
import AutoCompleteField from "../components/AutoCompleteField";
import DecoratedButton from "../components/DecoratedButton";
import Modal50Percent from "../components/mod/Modal50Percent";

const EmprestimosList = () => {

    const [emprestimos, setEmprestimos] = useState([]);
    const [erro, setErro] = useState(null);
    const [id, setId] = useState('')
    const [modoModal, setModoModal] = useState('add');
    const [idLivro, setIdLivro] = useState(null);
    const [idUsuario, setIdUsuario] = useState(null);
    const [busca, setBusca] = useState('');
    const [emprestimoSelecionado, setEmprestimoSelecionado] = useState(null);
    const [info, setInfo] = useState(null);

    const modalref = useRef();
    
     const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'idLivro') setIdLivro(value);
        if (name === 'idUsuario') setIdUsuario(value);
        if (name === 'busca') setBusca(value);
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

    async function abrirModalEdit(item) {
        setId(item.id);
        const elem = document.getElementById("modal1");
        const instance = M.Modal.getInstance(elem);
        instance.open();
        setModoModal('edit');

        try {
            const response = await fetch(`http://localhost:8080/emprestimos/${item.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao buscar detalhes do empréstimo");
        }

        setIdLivro(data.livro.id);
        setIdUsuario(data.usuario.id);
        } catch (error) {
            Toast.error("Erro ao abrir modal de edição: " + error.message);
        }
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

        try {

            if (modoModal === 'add') {
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
                    Toast.error("Erro ao salvar empréstimo: " + errorData.aviso);
                    return;
                }

                Toast.success("Empréstimo registrado com sucesso!");
                setIdLivro(null);
                setIdUsuario(null);
                const elem = document.getElementById("modal1");
                const instance = M.Modal.getInstance(elem);
                instance.close();
                buscarEmprestimos();
            } else {
                const response = await fetch(`http://localhost:8080/emprestimos/${id}`, {
                    method: "PUT",
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
                    Toast.error("Erro ao salvar empréstimo: " + errorData.aviso);
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

        } catch (error) {
            Toast.error(error);
        }
        // if (!response.ok) {
        //     const errorData = await response.json();
        //     Toast.error("Erro ao salvar empréstimo: " + errorData.message);
        //     return;
        // }

        // Toast.success("Empréstimo registrado com sucesso!");
        // setIdLivro(null);
        // setIdUsuario(null);
        // const elem = document.getElementById("modal1");
        // const instance = M.Modal.getInstance(elem);
        // instance.close();
        // buscarEmprestimos();
    }

    async function pesquisar() {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Usuário não autenticado.");
            }

            if (busca === '') {
                const response = await fetch("http://localhost:8080/emprestimos", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Erro ao buscar livros");
                }
                const data = await response.json();
                setEmprestimos(data);
                return;
            }
            const response = await fetch("http://localhost:8080/emprestimos/buscar?param="+busca, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao buscar empréstimos");
            }

            const data = await response.json();
            setEmprestimos(data);
        } catch (error) {
            console.error(error.message);
        }
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

    async function editar() {
        try {
            const response = await fetch(`http://localhost:8080/emprestimos/${id}`, {
                method: "PUT",
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
                Toast.error("Erro ao editar empréstimo: " + errorData.message);
                return;
            }

            Toast.success("Empréstimo editado com sucesso!");
            setIdLivro(null);
            setIdUsuario(null);
            const elem = document.getElementById("modal1");
            const instance = M.Modal.getInstance(elem);
            instance.close();
            buscarEmprestimos();
        } catch (error) {
            Toast.error("Erro ao editar empréstimo: " + error.message);
        }
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
            Toast.error("Erro ao excluir empréstimo: " + errorData.aviso);
            return;
        }

        Toast.success("Empréstimo excluído com sucesso!");
        buscarEmprestimos();
    }

    async function refresh() {
        document.getElementById("busca").value = '';
        setBusca('');
        buscarEmprestimos();
    }

    async function getEmprestimoInfos(item) {
        
        try {
            const response = await fetch(`http://localhost:8080/emprestimos/devolver/${item.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });

            let data = await response.json();

            if (!response.ok) {
                Toast.error(data.aviso);
                return;
            }

            setInfo(data);
        } catch(error) {
            Toast.error(error);
        }

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
                onEdit={(item) => abrirModalEdit(item)}
                onDelete={() => excluir()}
                onDetails={() => alert("Detalhes do empréstimo - Funcionalidade não implementada")}
                onSearch={pesquisar}
                fields={["id", "tituloLivro", "nomeUsuario"]}
                heads={["ID", "Título do Livro", "Nome do Usuário"]}
                openModal={(item) => abrirModal(item)}
                handleSearchChange={handleChange}
                onRefresh={() => refresh()}
                extButtons={
                    <>
                     <DecoratedButton 
                        icon="book"
                        action={(item) => {
                            getEmprestimoInfos(item)
                            modalref.current.open()
                        }}
                        text=""
                        description="Abre um janela para vizualiar o status do empréstimo e realizar operações de devolução, cobrança de multa, entre outras"
                     />
                    </>
                }
            />
            <Modal50Percent ref={modalref} title="Devolução de empréstimo">
                {erro && <div className="card-panel red lighten-2">{erro}</div>}
                <div>
                    {/* <p>{info.id}</p> */}
                </div>
            </Modal50Percent>
            <div id="modal1" className="modal my-modal">
                <div className="modal-content">
                    <h4>Registrar novo Empréstimo</h4>
                    <form id="inc" onSubmit={salvar}>
                        <AutoCompleteField 
                            label="Título do Livro"
                            url="http://localhost:8080/livros"
                            labelField="titulo"
                            selectedId={idLivro}
                            onSelect={(id) => setIdLivro(id)}
                        />
                        <AutoCompleteField 
                            label="Nome do Usuário"
                            url="http://localhost:8080/usuarios"
                            labelField="nome"
                            selectedId={idUsuario}
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