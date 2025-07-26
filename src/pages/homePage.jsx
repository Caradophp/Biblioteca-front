import React from 'react';
import BookCard from '../components/BookCard';

const HomePage = () => {
  // Livros de exemplo (no futuro, você pode buscar esses dados de uma API)
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

  return (
    <div className="container mt-5">
      <h1 className="center-align">Bem-vindo ao Sistema de Reservas de Livros</h1>
      <div className="row">
        {books.map((book) => (
          <div className="col s12 m6 l4" key={book.id}>
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
