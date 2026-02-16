import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import M from "materialize-css";

const Modal50Percent = forwardRef(({ title, children }, ref) => {
    const modalRef = useRef(null);
    const instanceRef = useRef(null);

    useEffect(() => {
        instanceRef.current = M.Modal.init(modalRef.current, {
            dismissible: false
        });
    }, []);

    useImperativeHandle(ref, () => ({
        open: () => instanceRef.current?.open(),
        close: () => instanceRef.current?.close()
    }));

    return (
        <div ref={modalRef} className="modal half-percent">
            <div className="modal-content">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>
                    <h4>{title}</h4>
                    <button className="simple-btn" onClick={() => instanceRef.current?.close()}>
                        <i className="material-icons">close</i>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
});

export default Modal50Percent;