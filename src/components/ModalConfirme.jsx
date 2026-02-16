import { useEffect } from "react";
import M from "materialize-css";

export default function ModalConfirme({ id, title, message, onConfirm }) {

    useEffect(() => {
        const elem = document.getElementById(id);
        M.Modal.init(elem);
    }, [id]);

    function fecharModal() {
        const elem = document.getElementById(id);
        const instance = M.Modal.getInstance(elem);
        instance.close();
    }

    function confirmar() {
        onConfirm();
        fecharModal();
    }

    return (
        <div id={id} className="modal confirme my-modal" >
            <div className="modal-content">
                <h4>{title}</h4>
                <p>{message}</p>
            </div>
            <div className="modal-footer" style={{display: 'flex', alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end'}}>
                <button className="btn" onClick={fecharModal} style={{display: 'flex', justifyContent: 'center'}}>
                    <i className="material-icons">close</i>Cancelar
                </button>
                <button className="btn red" onClick={confirmar} style={{display: 'flex', justifyContent: 'center'}}>
                    <i className="material-icons">delete</i>Excluir
                </button>
            </div>
        </div>
    );
}
