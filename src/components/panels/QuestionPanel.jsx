import { useImperativeHandle, useRef, useState } from 'react';
import DecoratedButton from '../DecoratedButton';

export default function QuestionPanel({question, onConfirm, extRef}) {

    const ref = useRef(null);
    const [ativo, setAtivo] = useState(false);

    function open() {
        setAtivo(true);
    }

    function close() {
        setAtivo(false);
    }

    useImperativeHandle(extRef, () => ({
        open: () => open(),
        close: () => close()
    }))

    return (
        <div className={ativo ? 'question-panel show' : 'question-panel'} id="question-panel" ref={ref}>
            <section>
                <div>
                    <i className='material-icons'>info</i>
                </div>
                <p>{question}</p>
                <div>
                    <DecoratedButton 
                        text="Sim"
                        action={() => {onConfirm(); close();}}
                    />
                    <DecoratedButton 
                        text="Não"
                        action={close}
                    />
                </div>
            </section>
        </div>
    );
}