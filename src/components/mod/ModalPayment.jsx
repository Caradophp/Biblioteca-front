import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import M from 'materialize-css';
import Toast from "../../utils/Toast";

const ModalPayment = forwardRef(({ info }, ref) => {
    const modalRef = useRef(null);
    const instanceRef = useRef(null);
    const [forma, setForma] = useState('');
    const [comentarios, setComentarios] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === 'payment') setForma(value);
        if (name === 'comentarios') setComentarios(value);

    }

    async function cobrarMulta(e) {
        e.preventDefault();
        if (forma === '') {
            Toast.info("Selecione a forma de pagamento");
        }

        if (forma === 'pix') {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/multa/pagar`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    idEmprestimo: info.id,
                    multaValor: info.multaValor,
                    tipoPagamento: forma
                })
            })

            let mensagem = await response.json();
            if (!response.ok) {
                Toast.warning(mensagem.aviso);
                return;
            }

            Toast.success("Multa paga com sucesso");
            instanceRef.current?.close()
        } catch (error) {
            Toast.error(error);
        }
    }

    useEffect(() => {
        instanceRef.current = M.Modal.init(modalRef.current, {
            dismissible: false
        })
    }, [])
    
    useImperativeHandle(ref, () => ({
        open: () => instanceRef.current?.open(),
        close: () => instanceRef.current?.close()
    }))

    return (
            <div ref={modalRef} class="modal my-modal">
                <div class="modal-content">
                    <h4>Pagamento de multa</h4>
                    <p>Escolha a forma de pagamento</p>
                     <form id="paymentForm" onSubmit={cobrarMulta}>
                        <p>
                            <label>
                                <input type="radio" name="payment" onChange={handleChange} value="dinheiro"/>
                                <span>Dinheiro</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="radio" name="payment" onChange={handleChange} value="credito"/>
                                <span>Cartão de crédito</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="radio" name="payment" onChange={handleChange} value="debito"/>
                                <span>Cartão de débito</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="radio" name="payment" onChange={handleChange} value="pix"/>
                                <span>Pix</span>
                            </label>
                        </p>
                    <br /><br />
                    {forma && <section>
                                <div className="row">
                                    <div className="col s3">
                                        <label htmlFor="forma">Forma de pagamento</label>
                                        <input type="text" name="forma" id="forma" value={forma} readOnly/>
                                    </div>
                                    <div className="col s9">
                                        <label htmlFor="valor">Valor da multa</label>
                                        <input type="number" name="valor" id="valor" value={info.multaValor} readOnly/>
                                    </div>
                                </div>
                                <div className="row">
                                    <label htmlFor="comentarios">Comentários</label>
                                    <textarea name="comentarios" id="comentarios" rows="20" maxLength="250" onChange={handleChange} className="materialize-textarea"></textarea>
                                </div>
                        </section>}
                    </form>
                </div>
                <div class="modal-footer">
                    <a className="modal-close waves-effect waves-green btn-flat" onClick={() => {
                        instanceRef.current?.close();
                    }}>Cancelar</a>
                    <button className="waves-effect waves-green btn-flat" type="submit" form="paymentForm">Prosseguir</button>
                </div>
            </div>
    );
});

export default ModalPayment;