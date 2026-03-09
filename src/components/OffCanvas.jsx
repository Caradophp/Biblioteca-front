import { useEffect, useImperativeHandle, useRef, useState } from "react";

export default function OffCanvas({ header, children, ref }) {

    const offCanvasRef = useRef(null);
    
    function close() {
        document.getElementById('off-canvas').classList.toggle('open')
    }

    function full() {
        document.getElementById('off-canvas').classList.toggle('full')
    }

    return (
        <div className="off-canvas" id="off-canvas" ref={offCanvasRef}>
            <header>
                <div>
                    <i className="material-icons" style={{cursor: 'pointer'}} onClick={() => full()}>open_in_full</i>
                    <i className="material-icons" style={{cursor: 'pointer'}} onClick={() => close()}>close</i>
                </div>
                { header }
            </header>
            <section className="content">
                { children }
            </section>
        </div>
    );
}