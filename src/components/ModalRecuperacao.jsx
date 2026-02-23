import { useState } from "react";
import Toast from '../utils/Toast';

export default function ModalRecuperacao() {
    
    const [carregando, setCarregando] = useState(false);
    const [emailForm, setEmailForm] = useState(true);
    const [formCode, setFormCode] = useState(false);
    const [newPassForm, setNewPassForm] = useState(false);
    const [codigo, setCodigo] = useState('');
    const [emailSalvo, setEmailSalvo] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirme, setConfirme] = useState('');

    const handleChange = (e) => {
        let {name, value} = e.target;

        if (name === 'codigo') setCodigo(value);
        if (name === 'newPass') setSenha(value);
        if (name === 'checkPass') setConfirme(value);

    }

    const recuperSenha = async (e) => {
        e.preventDefault();
        setCarregando(true);
    
        if (!email) {
          M.toast({ html: 'Por favor, insira seu email para recuperação.' });
          return;
        }
    
        try {
          const response = await fetch(`http://localhost:8080/usuarios/recuperar-senha`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            M.toast({ html: `Erro: ${errorData.aviso}` });
            setCarregando(false)
            return;
          }
    
          M.toast({ html: "Email de recuperação enviado! Verifique sua caixa de entrada." });
          setEmailForm(false);
          setFormCode(true)
          setEmailSalvo(email);
        } catch (error) {
          console.error("Erro:", error);
          M.toast({ html: 'Erro ao conectar com a API. Tente novamente mais tarde.' });
        }
        setCarregando(false);
    }

    const validarCodigo = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(`http://localhost:8080/codigo/validar?codigo=${codigo}&&email=${emailSalvo}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify({ email })
            });

            if (response.ok) {
                Toast.info('Código validado');
                setFormCode(false);
                setNewPassForm(true)
                return;
            }

            Toast.warning('Código inválido');

        } catch(error) {
            Toast.error(error);
        }
        
    }

    const mudarSenha = async (e) => {
        e.preventDefault();

        try {

            const response = await fetch(`http://localhost:8080/usuarios/alterar-senha`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: emailSalvo,
                    senha,
                    confirmeSenha: confirme
                })
            });

            if (response.ok) {
                Toast.success('Senha altarada com sucesso');

                setTimeout(() => location.reload(), 3000);
                return;
            }

            let message = await response.json();
            Toast.warning(message.aviso);

        } catch(error) {
            Toast.error(error);
        }
    }
    
    return (
        <div id="modalRecuperacao" className="modal my-modal">
            {/* {carregando && <Loader />} */}
            <div className="modal-content">
                <h4>Recuperação de Senha</h4>
                {emailForm && <div><p>Insira seu email para receber as instruções de recuperação.</p>
                <form id="rec" onSubmit={recuperSenha}>
                    <div className="input-field">
                        <input 
                            type="email" 
                            id="emailRecuperacao" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="emailRecuperacao">Email</label>
                    </div>
                </form></div>}
                {formCode && 
                    <form onSubmit={validarCodigo} id="code">
                        <p>Insira o código enviado no E-mail.</p>
                        <div className="input-field">
                            <input type="number" id="codigo" name="codigo" required  onChange={handleChange}/>
                            <label htmlFor="codigo">Código</label>
                        </div>
                    </form>
                }

                {newPassForm &&
                    <form id="new" onSubmit={mudarSenha}>
                        <p>Insira a nova senha</p>
                        <div className="input-field">
                            <input type="password" name="newPass" id="newPass" value={senha} onChange={handleChange}/>
                            <label htmlFor="newPass">Senha</label>    
                        </div>
                        <div className="input-field">
                            <input type="password" name="checkPass" id="checkPass" value={confirme} onChange={handleChange}/>
                            <label htmlFor="checkPass">Confirme a senha</label>    
                        </div>
                    </form>
                }
            </div>
            <div className="modal-footer">
                <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
                    <a className="modal-close btn red btn-al"><i className="material-icons">close</i>Cancelar</a>
                    <button type="submit" className="btn green btn-al" form={emailForm ? 'rec' : formCode ? 'code' : 'new'}><i className='material-icons'>send</i>Enviar</button>
                </div>
            </div>
        </div>
    );
}