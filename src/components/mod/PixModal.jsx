import { useState } from "react";
// import QRCode from 'qrcode.react';

const PixModal = ({ref}) => {

    const [pixData, setPixData] = useState('');

    return (
        <div ref={ref} class="modal my-modal">
            <div class="modal-content">
                <h4>Pague a multa por meio do QR Code abaixo</h4>
                <hr />
                <div className="custom-container">
                    {/* <QRCode /> */}
                    <img src="/src/assets/qr.webp" alt="QR Code" className="responsive-img" />
                </div>
                <hr />
                <div class="modal-footer">
                    <a className="modal-close waves-effect waves-green btn-flat" onClick={() => {
                        ref.current?.close();
                    }}>Cancelar</a>
                    <button className="waves-effect waves-green btn-flat">Prosseguir</button>
                </div>
            </div>
        </div>
    );
}

export default PixModal;