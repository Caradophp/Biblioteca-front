import { useEffect, useState, useRef } from "react"; 
import { Navigate } from "react-router-dom"; 
import Toast from "../utils/Toast"; 
import ModalValidarSenha from "./mod/ModalValidarSenha";

const PrivateRoute = ({ children }) => {
  const [status, setStatus] = useState("verificando");
  const modalRef = useRef(null);

  async function validarToken() {
    const token = localStorage.getItem("token");

    if (!token) {
      setStatus("semToken");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/usuarios/validar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 403) {
        setStatus("expirado");
        return;
      }

      if (!response.ok) {
        localStorage.removeItem("token");
        setStatus("semToken");
        return;
      }

      setStatus("autenticado");
    } catch (error) {
      localStorage.removeItem("token");
      setStatus("semToken");
    }
  }

  useEffect(() => {
    validarToken();
    const interval = setInterval(validarToken, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (status === "expirado") {
      const modal = document.querySelector("#modalValidarSenha");
      if (modal) {
        const instance = M.Modal.getInstance(modal);
        instance.open();
      }

      const i = M.Modal.getInstance(modal);
      setTimeout(() => { 
        i.close(); const 
        req = document.querySelector("#modalSessaoExpirada"); 
        const inst = M.Modal.getInstance(req); 
        inst.open(); 
      }, 600000)
    }
  }, [status]);

  if (status === "verificando") return null;

  if (status === "semToken") {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {status === "expirado" && (
        <ModalValidarSenha ref={modalRef} />
      )}
      {status === "autenticado" && children}
    </>
  );
};

export default PrivateRoute;
