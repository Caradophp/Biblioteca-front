export default function ModalRecuperacao({ submitAction }) {
    return (
        <div id="modalRecuperacao" className="modal my-modal">
            <div className="modal-content">
                <h4>Recuperação de Senha</h4>
                <p>Insira seu email para receber as instruções de recuperação.</p>
                <form id="rec" onSubmit={submitAction}>
                    <div className="input-field">
                        <input type="email" id="emailRecuperacao" required />
                        <label htmlFor="emailRecuperacao">Email</label>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                    <a className="modal-close btn red btn-al"><i className="material-icons">close</i>Cancelar</a>
                    <button type="submit" className="btn green btn-al" form="rec"><i className='material-icons'>send</i>Enviar</button>
                </div>
            </div>
        </div>
    );
}