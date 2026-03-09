import DecoratedButton from './DecoratedButton';
import Toast from '../utils/Toast';

export default function Notification({title, content, state, notification, refresh}) {

    async function vizualizar(id) {
        try {
            const response = await fetch(`http://localhost:8080/notificacoes/vizualizar`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    idUsuario: localStorage.getItem('id_usuario'),
                    idNotificacao: id
                })
            })

            if (!response.ok) {
                Toast.error('Erro inesperado')
                return;
            };

            Toast.success('Notificação vizualizada')
            refresh('test2');
        } catch (error) {
            Toast.error(error);
        }
    }

    async function deletar(id) {
        try {
            const response = await fetch(`http://localhost:8080/notificacoes/deletar`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    idUsuario: localStorage.getItem('id_usuario'),
                    idNotificacao: id
                })
            })

            if (!response.ok) {
                Toast.error('Erro inesperado')
                return;
            };

            Toast.success('Notificação deletada')
            refresh('test3');
        } catch (error) {
            Toast.error(error);
        }
    }

    async function reciclar(id) {
        try {
            const response = await fetch(`http://localhost:8080/notificacoes/reciclar`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    idUsuario: localStorage.getItem('id_usuario'),
                    idNotificacao: id
                })
            })

            if (!response.ok) {
                Toast.error('Erro inesperado')
                return;
            };

            Toast.success('Notificação restaurada')
            refresh('test2');
        } catch (error) {
            Toast.error(error);
        }
    }

    return (
        <div className="my-notification">
            <header>
                {title}
            </header>
            <main>
                {content}
            </main>
            <footer>
                {state === 'old' && 
                    <DecoratedButton 
                        text=""
                        icon='delete'
                        description="Exclui a notificação"
                        action={() => deletar(notification.idNotificacao)}
                    />
                }
                {state === 'new' && 
                    <DecoratedButton 
                        text=""
                        icon="visibility"
                        description="Marca como vizualizada"
                        action={() => vizualizar(notification.idNotificacao)}
                    />
                }
                {state === 'del' && 
                    <DecoratedButton 
                        text=""
                        icon="recycling"
                        description="Restaura a notificação excluida"
                        action={() => reciclar(notification.idNotificacao)}
                    />
                }
            </footer>
        </div>
    );
}