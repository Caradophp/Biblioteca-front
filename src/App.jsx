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
import Loader from './components/Loader';
import Escolas from './pages/Escolas';
import Footer from './components/Footer';
import { LoaderProvider } from './components/LoaderContext';

function AppContent() {
  const location = useLocation();
  
  const esconderNavbar = location.pathname === '/';

  return (
    <>
    <LoaderProvider>
      {!esconderNavbar && <Navbar />}
      <div>
        {/* <Loader /> */}
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
          <Route path='/escolas' element={<Escolas />}/>
        </Routes>
        {!esconderNavbar && <Footer/>}
      </div>
      <div id="modalSessaoExpirada" class="modal my-modal">
        <div class="modal-content">
          <h4>Atenção</h4>
          <p>Sua sessão expirou, faça login novamente.</p>
        </div>
        <div class="modal-footer">
          <button class="modal-close btn red btn-al" onClick={() => {
            localStorage.removeItem("token")
            window.location.href = '/'
          }}><i className='material-icons'>lock_outline</i>Logar Novamente</button>
        </div>
      </div>
      </LoaderProvider>
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
