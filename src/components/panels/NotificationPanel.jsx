import OffCanvas from '../OffCanvas';
import Notification from '../Notification';
import React, { useRef, useState } from 'react';
import M from 'materialize-css';
import Toast from '../../utils/Toast';

export default function NotificationPanel() {

    const tabsRef = useRef(null);

    const [busca, setBusca] = useState('');
    const [notificacoes, setNotificacoes] = useState([]);
    const notificacoesNovas = notificacoes.filter(n => n.state === "new");
    const notificacoesVizualizadas = notificacoes.filter(n => n.state === "old");
    const notificacoesDeletadas = notificacoes.filter(n => n.state === "del");

    const handleChange = (e) => {
        var {name, value} = e.target;
        if (name === 'busca') setBusca(value); 
    }

    async function getNotifications(selectTabId = 'test1') {
        try {
            const response = await fetch(`http://localhost:8080/notificacoes/${localStorage.getItem('id_usuario')}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })

            if (!response.ok) {
                Toast.error('Erro inesperado')
                return;
            };

            let data = await response.json();
            const instance = M.Tabs.getInstance(tabsRef.current);
            instance.select(selectTabId);
            setNotificacoes(data);
        } catch (error) {
            Toast.error(error);
        }
    }

    async function pesquisar() {
        try {
            const response = await fetch(`http://localhost:8080/notificacoes/pesquisar/${localStorage.getItem('id_usuario')}?param=${busca}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })

            if (!response.ok) {
                Toast.error('Erro inesperado')
                return;
            };

            let data = await response.json();
            setNotificacoes(data);
        } catch (error) {
            Toast.error(error);
        }
    }

    async function vizualizarTodas() {
            try {
                const response = await fetch(`http://localhost:8080/notificacoes/vizualizar/todas`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        idUsuario: localStorage.getItem('id_usuario'),
                    })
                })
    
                if (!response.ok) {
                    Toast.error('Erro inesperado')
                    return;
                };
    
                Toast.info('Operação realizada com sucesso')
                getNotifications('test2');
            } catch (error) {
                Toast.error(error);
            }
        }

        async function deletarTodas() {
            try {
                const response = await fetch(`http://localhost:8080/notificacoes/deletar/todas`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({
                        idUsuario: localStorage.getItem('id_usuario'),
                    })
                })
    
                if (!response.ok) {
                    Toast.error('Erro inesperado')
                    return;
                };
    
                Toast.info('Operação realizada com sucesso')
                getNotifications('test3');
            } catch (error) {
                Toast.error(error);
            }
        }

    React.useEffect(() => {
        if (tabsRef.current) {
            M.Tabs.init(tabsRef.current);
            const instance = M.Tabs.getInstance(tabsRef.current);
            instance.updateTabIndicator();
            getNotifications();
        }
    }, []);

    return (
        <OffCanvas header={
        <div className="search-bar">
            <input placeholder="Digite o que você procura e pressione enter" name='busca' value={busca} onChange={handleChange}/>

            <button className="btn-search" title='Pesquisar' onClick={pesquisar}>
            <i className="material-icons">search</i>
            </button>

            <button className="btn-success" title='Marca todas as notificações como vizualizadas' onClick={vizualizarTodas}>
            <i className="material-icons">check</i>
            </button>

            <button className="btn-danger" title='Marca todas as notificações como deletadas' onClick={deletarTodas}>
            <i className="material-icons">delete</i>
            </button>

            <button className="btn-info" title='atualizar' onClick={() => {setBusca(''); getNotifications();}}>
            <i className="material-icons">loop</i>
            </button>
        </div>
        }>
            <div className="row">
            <div className="col s12">
                <ul className="tabs" ref={tabsRef}>
                <li className="tab col s4"><a href="#test1" className="active">Notificações</a></li>
                <li className="tab col s4"><a href="#test2">Vizualizadas</a></li>
                <li className="tab col s4"><a href="#test3">Deletadas</a></li>
                </ul>
            </div>
            <div id="test1" className="col s12">
                {notificacoesNovas.map(n => (
                <Notification
                    key={n.id}
                    title={n.titulo}
                    content={n.descricao}
                    state="new"
                    notification={n}
                    refresh={getNotifications}
                />
                ))}
            </div>
            <div id="test2" className="col s12">
                {notificacoesVizualizadas.map(n => (
                <Notification
                    key={n.id}
                    title={n.titulo}
                    content={n.descricao}
                    state="old"
                    notification={n}
                    refresh={getNotifications}
                />
                ))}
            </div>
            <div id="test3" className="col s12">
                {notificacoesDeletadas.map(n => (
                <Notification
                    key={n.id}
                    title={n.titulo}
                    content={n.descricao}
                    state="del"
                    notification={n}
                    refresh={getNotifications}
                />
                ))}
            </div>
            </div>
        </OffCanvas>
    );
}