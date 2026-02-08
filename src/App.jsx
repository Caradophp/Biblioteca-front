import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './pages/homePage';
import './style/style.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import CadastroUsuario from './pages/CadastroUsuario';
import LoginUsuario from './pages/LoginUsuario';
import ListaUsuario from './pages/ListaUsuario';
import PrivateRoute from './components/Privateroute';
import ListarLivros from './pages/ListLivros';
import EmprestimosList from './pages/EmprestimosList';

function AppContent() {
  const location = useLocation();
  
  // Define quais rotas NÃO devem exibir a Navbar
  const esconderNavbar = location.pathname === '/';

  return (
    <>
      {!esconderNavbar && <Navbar />}
      <div>
        <Routes>
          <Route path="/" element={<LoginUsuario />} />
          <Route path='/livros' element={<ListarLivros />} />
          <Route path="/home" element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>} />
          <Route path="/cadastrar" element={<CadastroUsuario />} />
          <Route path="/lista" element={
            <PrivateRoute>
              <ListaUsuario />
            </PrivateRoute>} />
          <Route path="/emprestimos" element={
            <PrivateRoute>
              <EmprestimosList />
            </PrivateRoute>} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
