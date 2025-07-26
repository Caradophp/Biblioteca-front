import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ProtegeRota = ({ children, roleNecessario }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Se não houver token, redireciona para a página de login
    return <Navigate to="/" />;
  }

  try {
    const decoded = jwtDecode(token);

    // Se o role não corresponder ao role necessário, redireciona para acesso negado
    if (decoded.role !== roleNecessario) {
      return <Navigate to="/acesso-negado" />;
    }
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    // Se falhar ao decodificar o token, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  // Se o token for válido e o role for correto, renderiza os filhos (a rota protegida)
  return children;
};

export default ProtegeRota;
