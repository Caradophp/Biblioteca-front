import React, { useState, useEffect, useRef } from "react";
import Toast from "../utils/Toast";
import ModalConfirme from "../components/ModalConfirme";
import OptionPanel from "../components/OptionPanel";
import ButtonsColumn from "../components/ButtonsColumn";
import { hasRole } from "../utils/Auth";
// import { LoadingOverlay } from "../utils/Loader";

const ListarLivros = () => {
    // const [loader, setLoader] = useState(false);
    const [modoModal, setModoModal] = useState('create');
    const [livros, setLivros] = useState([]);
    const [id, setId] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [ano, setAno] = useState('');
    const [genero, setGenero] = useState('');
    const [numeroLivro, setNumeroLivro] = useState('');
    const [quantidadeLivros, setQuantidadeLivros] = useState('');
    const [quantidadePaginas, setQuantidadePaginas] = useState('');
    const [livroSelecionado, setLivroSelecionado] = useState(null);
    const [estado, setEstado] = useState('');
    const [status, setStatus] = useState('');
    const [busca, setBusca] = useState('');

    const instance = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'titulo') setTitulo(value);
        if (name === 'autor') setAutor(value);
        if (name === 'ano') setAno(value);
        if (name === 'genero') setGenero(value);
        if (name === 'numeroLivro') setNumeroLivro(value);
        if (name === 'quantidadeLivros') setQuantidadeLivros(value);
        if (name === 'quantidadePaginas') setQuantidadePaginas(value);
        if (name === 'estado') setEstado(value);
        if (name === 'status') setStatus(value);
        if (name === 'busca') setBusca(value);
    };

    useEffect(() => {
        const elem = document.getElementById("teste");
        instance.current = M.Modal.getInstance(elem);
    });

    function abrirModal(modo, livro = null) {
        setModoModal(modo);
        setLivroSelecionado(livro);

        if (livro) {
            setTitulo(livro.titulo);
            setAutor(livro.autor);
            setAno(livro.ano);
            setGenero(livro.genero);
            setNumeroLivro(livro.numeroLivro);
            setQuantidadeLivros(livro.quantidadeLivros);
            setQuantidadePaginas(livro.quantidadePaginas);
            setEstado(livro.estado || '');
            setStatus(livro.status || '');
        } else {
            limparFormulario();
        }

        const modal = M.Modal.getInstance(document.getElementById("modal1"));
        modal.open();
    }

    function limparFormulario() {
        setTitulo('');
        setAutor('');
        setAno('');
        setGenero('');
        setNumeroLivro('');
        setQuantidadeLivros('');
        setQuantidadePaginas('');
        setMensagem('');
    }

    function limparBusca() {
        setBusca('');
        document.getElementById('busca').value = '';
        buscarLivros(new Event('submit'));
    }

    function abrirModalConfirmacao(livro) {
        setId(livro.id);
        instance.current.open();
    }

    async function buscarLivros(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Usuário não autenticado.");
            }

            if (busca === '') {
                const response = await fetch("http://localhost:8080/livros", {
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
                setLivros(data);
                return;
            }
            const response = await fetch("http://localhost:8080/livros/buscar?param="+busca, {
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
            setLivros(data);
        } catch (error) {
            console.error(error.message);
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();

        if (!titulo || !autor || !ano || !genero || !numeroLivro || !quantidadeLivros || !quantidadePaginas) {
            setMensagem('Por favor, preencha todos os campos.');
            return;
        }

        if (ano > new Date().getFullYear()) {
            setMensagem('Ano inválido.');
            return;
        }

        try {
            if (modoModal === 'edit' && livroSelecionado) {
                const response = await fetch(`http://localhost:8080/livros/${livroSelecionado.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({ titulo, autor, ano, genero, numeroLivro, estado, status, quantidadeLivros, quantidadePaginas })
                });

                if (!response.ok) {
                    throw new Error('Erro ao atualizar livro.');
                }

                reConfig();
                window.location.reload();
                Toast.info('Livro atualizado com sucesso');
                return;
            }
            const response = await fetch('http://localhost:8080/livros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'id_usuario': localStorage.getItem('id_usuario'),
                },
                body: JSON.stringify({ titulo: titulo, autor, ano, genero, numeroLivro, quantidadeLivros, quantidadePaginas })
            });        
            reConfig();
            instance.current?.close();
            buscarLivros(new Event('submit'));
            Toast.success('Livro adicionado com sucesso!');
        } catch (error) {
            console.log(error);
            setMensagem('Erro ao adicionar livro.');
        }
    }

    async function excluirLivro() {
        try {
            const response = await fetch(`http://localhost:8080/livros/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir livro.');
            }

            window.location.reload();
            Toast.success('Livro excluído com sucesso!');   
        } catch (error) {
            Toast.error("Erro ao excluir livro: " + error)
        }
    }

    function reConfig() {
        setMensagem('');
    }

    useEffect(() => {
        M.Modal.init(document.querySelectorAll('.modal'));
        try {
            const fetchLivros = async () => {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Usuário não autenticado.");
                }

                const response = await fetch("http://localhost:8080/livros", {
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
                setLivros(data);
            };

            fetchLivros();
        } catch (error) {
            console.error(error.message);
        }
    }, [])
    return (
        <div className="my-container">
            {/* <Loader show={loader} /> */}
            <ModalConfirme 
                id={"teste"}
                title={"Exclusão"}
                message={"Deseja realmente excluir esse livro?"}
                onConfirm={() => excluirLivro()}
            />
            <h3>Lista de Livros</h3>
            {hasRole(['administrador']) && <OptionPanel 
                onAdd={() => abrirModal('create')}
                onRefresh={() => limparBusca()}
                onSearchChange={handleChange}
                onSearch={buscarLivros}
            >
                <button className="btn waves-effect waves-light btn-al" onClick={() => window.location.href = '/emprestimos'} >
                    <i className="material-icons">send</i>
                    Emprestimo
                </button>
            </OptionPanel>}
            <div className="table-responsive">
                <table className="my-table highlight centered">
                    <thead>
                        <tr>
                            <th>Número</th>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Ano</th>
                            {hasRole(['administrador']) && <th>Ações</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro) => (
                            <tr key={livro.id}>
                                <td>{livro.numeroLivro}</td>
                                <td>{livro.titulo}</td>
                                <td>{livro.autor}</td>
                                <td>{livro.ano}</td>
                                {/* <td>
                                    <button title="Editar" style={{cursor: 'pointer'}} onClick={() => abrirModal('edit', livro)}><i className="material-icons">edit</i></button>
                                    <button title="Excluir" style={{cursor: 'pointer'}} onClick={() => abrirModalConfirmacao(livro)}><i className="material-icons">delete</i></button>
                                    <button title="Visualizar" style={{cursor: 'pointer'}}><i className="material-icons">visibility</i></button>
                                </td> */}
                                <td>
                                    {hasRole(['administrador']) && <ButtonsColumn onEdit={() => abrirModal('edit', livro)} onDelete={() => abrirModalConfirmacao(livro)} onDetails={() => Toast.warning("Funcionalidade não implementada")} />}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div id="modal1" className="modal my-modal">
                <div className="modal-content">
                    <h4>Adicionar Novo Livro</h4>
                    {mensagem && <p className="card-panel red" id="erroMsg">{mensagem}</p>}
                    <form onSubmit={handleSubmit} id="inc">
                        <div className="input-field">
                            <input type="text" id="titulo" name="titulo" value={titulo} onChange={handleChange} />
                            <label htmlFor="titulo" className={titulo ? "active" : ""}>Título</label>
                        </div>
                        <div className="input-field">
                            <input type="text" id="autor" name="autor" value={autor} onChange={handleChange} />
                            <label htmlFor="autor" className={autor ? "active" : ""}>Autor</label>
                        </div>
                        <div className="input-field">
                            <input type="number" id="ano" name="ano" value={ano} onChange={handleChange} />
                            <label htmlFor="ano" className={ano ? "active" : ""}>Ano</label>
                        </div>
                        <div className="input-field">
                            <input type="text" name="genero" id="genero" value={genero} onChange={handleChange} />
                            <label htmlFor="genero" className={genero ? "active" : ""}>Gênero</label>
                        </div>
                        <div className="input-field">
                            <input type="number" name="numeroLivro" id="numeroLivro" value={numeroLivro} onChange={handleChange} />
                            <label htmlFor="numeroLivro" className={numeroLivro ? "active" : ""}>Número do Livro</label>
                        </div>
                        <div className="input-field">
                            <input type="text" name="quantidadeLivros" id="quantidadeLivros" value={quantidadeLivros} onChange={handleChange} />
                            <label htmlFor="quantidadeLivros" className={quantidadeLivros ? "active" : ""}>Quantidade de Livros</label>
                        </div>
                        <div className="input-field">
                            <input type="text" name="quantidadePaginas" id="quantidadePaginas" value={quantidadePaginas} onChange={handleChange} />
                            <label htmlFor="quantidadePaginas" className={quantidadePaginas ? "active" : ""}>Quantidade de páginas</label>
                        </div>
                        {modoModal === 'edit' && (
                            <>
                                <div className="input-field">
                                    <input 
                                        name="estado" 
                                        id="estado" 
                                        value={estado} 
                                        onChange={handleChange} 
                                    />
                                    <label htmlFor="estado" className={estado ? "active" : ""}>
                                        Estado do Livro
                                    </label>
                                </div>
                                <div className="input-field">
                                    <input 
                                        name="status" 
                                        id="status" 
                                        value={status} 
                                        onChange={handleChange} 
                                    />
                                    <label htmlFor="status" className={status ? "active" : ""}>
                                        Status do Livro
                                    </label>
                                </div>
                            </>
                        )}
                    </form>
                </div>
                <div className="modal-footer fixed-footer">
                    <button className="btn waves-effect waves-light modal-close" onClick={reConfig}>Cancelar</button>
                    <button className="btn waves-effect waves-light" type="submit" form="inc">Salvar</button>
                </div>
            </div>
        </div>
    );
}

export default ListarLivros;