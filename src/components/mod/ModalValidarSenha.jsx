import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import M from 'materialize-css';

const ModalValidarSenha = forwardRef((props, ref) => {
    const modalRef = useRef(null);
    const instanceRef = useRef(null);
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === 'nome') setNome(value);
        if (name === 'senha') setSenha(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nome === '' || senha === '') {
            M.toast({html: "Por favor, preencha todos os campos"});
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/usuarios/login`,
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, senha })
                }
            );

            if (!response.ok) {
                throw new Error('Credenciais inválidas ou erro na API');
            }

            const data = await response.json();
            localStorage.removeItem('token');
            localStorage.setItem('token', data.token);

            window.location.reload();

        } catch (error) {
            M.toast({html: error})
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
        <div ref={modalRef} className="modal my-modal" id="modalValidarSenha">
            <div className="modal-content">
                <section style={{display: 'flex', justifyContent: 'space-between', alignItems: "center"}}>
                    <h1>Confirme quem é:</h1>
                </section>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome</label>
                    <input type="text" name="nome" id="nome" onChange={handleChange}/>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" name="senha" id="senha" onChange={handleChange}/>
                    <input type="submit" className="btn blue" value="Enviar"/>
                </form>
            </div>
        </div>
    );
});

export default ModalValidarSenha;