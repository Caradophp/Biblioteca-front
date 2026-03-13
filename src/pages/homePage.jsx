import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import QuestionPanel from '../components/panels/QuestionPanel';
import M from 'materialize-css';

const HomePage = () => {

  const [livros, setLivros] = useState([]);

  const books = [
    {
      id: 1,
      title: 'O Senhor dos Anéis',
      author: 'J.R.R. Tolkien',
      image: 'https://images.unsplash.com/photo-1544716278-1075d159ef11', // Uma imagem aleatória
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      image: 'https://images.unsplash.com/photo-1563451885-b1c727d63539',
    },
    {
      id: 3,
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      image: 'https://images.unsplash.com/photo-1539290731049-b3b226fa01e4',
    },
  ];

  useEffect(() => {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems);
    try {
      const fetchLivros = async () => {
          const token = localStorage.getItem("token");
          if (!token) {
              throw new Error("Usuário não autenticado.");
          }

          const response = await fetch("http://localhost:8080/livros/10", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
          });

          if (!response.ok) {
              throw new Error("Erro ao buscar livros");
          }

          const data = await response.json();
          setLivros(data);
      };

      fetchLivros();
    } catch (error) {
        console.error(error.message);
    }
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="center-align">Bem-vindo ao Sistema de Reservas de Livros</h1>
      <div className="row">
        {livros.map((livro) => (
          <div className="col s12 m6 l4" key={livro.id}>
            <BookCard book={livro} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
