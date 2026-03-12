import { useImperativeHandle, useRef, useState } from 'react';
import DecoratedButton from '../DecoratedButton';

export default function QuestionPanel({extRef}) {

    const ref = useRef(null);
    const [ativo, setAtivo] = useState(false);
    const [question, setQuestion] = useState('');
    const [callback, setCallback] = useState(null);

    function open(mensagem, acao) {
        setQuestion(mensagem);
        setCallback(() => acao);
        setAtivo(true);
    }

    function close() {
        setAtivo(false);
    }

    useImperativeHandle(extRef, () => ({
        open: (msg, acao) => open(msg, acao),
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
                        action={() => {callback(); close();}}
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