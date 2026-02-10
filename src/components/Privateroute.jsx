import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Toast from "../utils/Toast";

const PrivateRoute = ({ children }) => {
  const [autenticado, setAutenticado] = useState(true);

  async function validarToken() {
    let token = localStorage.getItem("token");

    if (!token) {
      setAutenticado(false);
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

      if (!response.ok) {
        localStorage.removeItem("token");
        setAutenticado(false);
      }
    } catch (error) {
      console.log("Erro na validação do token:", error);
      Toast.error("Sessão expirada. Faça login novamente.");
      localStorage.removeItem("token");
      setAutenticado(false);
    }
  }

  useEffect(() => {
    validarToken(); // valida ao entrar na rota

    const interval = setInterval(() => {
      validarToken(); // valida a cada 5 segundos
    }, 5000);

    return () => clearInterval(interval); // limpa o intervalo
  }, []);

  if (!autenticado) {
    if (!autenticado) {
      const modal = document.querySelector("#modalSessaoExpirada");
      if (modal) {
        const instance = M.Modal.getInstance(modal);
        instance.open();
      }
    }
  }

  return children;
};

export default PrivateRoute;