import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './pages/homePage';
import './style/style.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import CadastroUsuario from './pages/CadastroUsuario';
import LoginUsuario from './pages/LoginUsuario';
import ListaUsuario from './pages/ListaUsuario';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<LoginUsuario />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/cadastrar" element={<CadastroUsuario />} />
          <Route path="/lista" element={<ListaUsuario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
