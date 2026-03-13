import { useImperativeHandle, useState } from "react";

export default function Loader({ref}) {

    const [ativo, setAtivo] = useState(false);

    function show() {
        setAtivo(true)
    }

    function hide() {
        setAtivo(false)
    }

    useImperativeHandle(ref, () => ({
        show: () => show(),
        hide: () => hide()
    }));

    return (
        <div>
            {ativo === true && <div id="loading">
                <img src="/src/assets/loading.gif" alt="gif de carregamento" width="50px" height="50px" />
                <label style={{color: 'white'}}>Carregando...</label>
            </div>}
        </div>
    );
}