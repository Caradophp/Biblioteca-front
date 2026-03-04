import { use, useEffect, useRef, useState } from "react";
import CrudComponent from "../components/CrudComponent";
import Toast from "../utils/Toast";
import M from "materialize-css";
import DecoratedButton from "../components/DecoratedButton";
import { data } from "react-router-dom";
import ModalConfirme from "../components/ModalConfirme";

export default function Escolas() {

    const [escolas, setEscolas] = useState([])
    const [modalMode, setModalMode] = useState('');
    const [nome, setNome] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('');
    const [bairro, setBairro] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero]= useState('')
    const [id, setId] = useState('');
    const [erro, setErro] = useState('');
    const [isBloqueado, setBloqueado] = useState(false);

    const modalRef = useRef();

    // const mod = M.Modal.getInstance(document.getElementById('modal5'));

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'estado') setEstado(value);
        if (name === 'nome') setNome(value);
        if (name === 'cidade') setCidade(value);
        if (name === 'bairro') setBairro(value);
        if (name === 'rua') setRua(value);
        if (name === 'numero') setNumero(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (modalMode === 'add') {
            try {
                
                if (checkGeneral()) {
                    return;
                }

                const response = await fetch(`http://localhost:8080/escolas`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        escola: {
                            nome: nome
                        },
                        endereco: {
                            estado: estado,
                            municipio: cidade,
                            nomeBairro: bairro,
                            nomeRua: rua,
                            numero: numero
                        }
                    })
                })

                let data = await response.json();
                if (response.ok) {
                    Toast.success('Escola registrada com sucesso');
                    buscarEscolas();
                    M.Modal.getInstance(modalRef.current).close();
                } else {
                    Toast.warning(data.aviso);
                }

            } catch (error) {
                Toast.error(error);
            }
            return;
        }

        if (modalMode === 'edit') {
            try {

                if (checkGeneral()) {
                    return;
                }


                const response = await fetch(`http://localhost:8080/escolas/${id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        escola: {
                            nome: nome
                        },
                        endereco: {
                            estado: estado,
                            municipio: cidade,
                            nomeBairro: bairro,
                            nomeRua: rua,
                            numero: numero
                        }
                    })
                })

                let data = await response.json();
                if (response.ok) {
                    Toast.info('Registro alterado com sucesso');
                    buscarEscolas();
                    M.Modal.getInstance(modalRef.current).close();
                } else {
                    Toast.warning(data.aviso);
                }
            } catch (error) {
                Toast.error(error);
            }
            return;
        }


        Toast.warning('Modo da modal é inválido');
        
    }

    async function deletar() {
        try {
            const response = await fetch(`http://localhost:8080/escolas/${id}`, {
                method: 'DELETE',
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

            Toast.info("Deletado com sucesso");
            buscarEscolas();
        } catch (error) {
            Toast.error(error)
        }
    }

    function abrirModal() {
        setBloqueado(false);
        M.Modal.getInstance(modalRef.current).open();
        setId('');
        setNome('');
        setEstado('');
        setCidade('');
        setBairro('');
        setRua('');
        setNumero('')
    }

    function abrirModalEdit(item) {
        setBloqueado(false);
        M.Modal.getInstance(modalRef.current).open();
        setId(item.id);
        setNome(item.nome);
        setEstado(item.endereco.estado);
        setCidade(item.endereco.municipio);
        setBairro(item.endereco.nomeBairro);
        setRua(item.endereco.nomeRua);
        setNumero(item.endereco.numero)
    }

    function abrirModalCon(item) {
        setBloqueado(true);
        M.Modal.getInstance(modalRef.current).open();
        setId(item.id);
        setNome(item.nome);
        setEstado(item.endereco.estado);
        setCidade(item.endereco.municipio);
        setBairro(item.endereco.nomeBairro);
        setRua(item.endereco.nomeRua);
        setNumero(item.endereco.numero)
    }

    function confirmar(item) {
        setId(item.id);
        M.Modal.getInstance(document.getElementById('modalConfirme')).open();
    }

    function checkGeneral() {
        if (nome === '') {setErro('Campo [Nome] deve ser informado'); return true;}
        if (estado === '') {setErro('Campo [Estado] deve ser informado'); return true;}
        if (cidade === '') {setErro('Campo [Cidade] deve ser informado'); return true;}
        if (bairro === '') {setErro('Campo [Bairro] deve ser informado'); return true;}
        if (rua === '') {setErro('Campo [Rua] deve ser informado'); return true;}
        if (numero === '') {setErro('Campo [Número] deve ser informado'); return true;}
    }

    async function buscarEscolas() {
        try {
            const response = await fetch(`http://localhost:8080/escolas`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })

            if (!response.ok) {
                Toast.error('Erro inesperado ao carregar escolas')
                return;
            }

            let data = await response.json();
            setEscolas(data)


        } catch (error) {
            Toast.error(error);
        }
    }

    useEffect(() => {
        M.Modal.init(modalRef.current, {
            dismissible: false
        });
        buscarEscolas();
    }, []);

    return (
        <div>
            <h1>Escolas</h1>
            <CrudComponent 
                data={escolas}
                onAdd={() => {
                    setModalMode('add')
                    abrirModal()
                }}
                onEdit={(item) => {
                    setModalMode('edit')
                    abrirModalEdit(item);
                }}
                onDelete={() => deletar()}
                onDetails={(item) => {
                    setModalMode('con')
                    abrirModalCon(item);
                }}
                onSearch={() => Toast.warning("Não inplementado")}
                fields={["id", "nome"]}
                heads={["ID", "Escola"]}
                openModal={(item) => confirmar(item)}
                handleSearchChange={handleChange}
                onRefresh={() => Toast.warning("Não inplementado")}
            />
            <div id="modal5" class="modal my-modal" ref={modalRef}>
                <div class="modal-content">
                    <form id="inc" onSubmit={handleSubmit}>
                        {erro && <div className="row card-panel red lighten-2">{erro}</div>}
                        <div className="row">
                            <div className="col s6">
                                <label htmlFor="nome">Nome:</label>
                                <input type="text" id="nome" name="nome" value={nome} onChange={handleChange} readOnly={isBloqueado}/>
                            </div>
                            <div className="col s6">
                                <label htmlFor="estado">Estado:</label>
                                <input type="text" id="estado" name="estado" value={estado} onChange={handleChange} readOnly={isBloqueado}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s6">
                                <label htmlFor="cidade">Cidade</label>
                                <input type="text" name="cidade" id="cidade" value={cidade} onChange={handleChange} readOnly={isBloqueado}/>
                            </div>
                            <div className="col s6">
                                <label htmlFor="bairro">Bairro</label>
                                <input type="text" name="bairro" id="bairro" value={bairro} onChange={handleChange} readOnly={isBloqueado}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s9">
                                <label htmlFor="rua">Rua</label>
                                <input type="text" name="rua" id="rua" value={rua} onChange={handleChange} readOnly={isBloqueado}/>
                            </div>
                            <div className="col s3">
                                <label htmlFor="numero">Numero</label>
                                <input type="number" name="numero" id="numero" value={numero} onChange={handleChange} readOnly={isBloqueado}/>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button className="btn waves-effect waves-light modal-close" onClick={() => setErro('')}>Cancelar</button>
                    {isBloqueado === false && <button className="btn waves-effect waves-light" type="submit" form="inc">Salvar</button>}
                </div>
            </div>
        </div>
    );
}