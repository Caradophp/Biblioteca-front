import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="card my-card">
      <div className="card-content">
        <span className="card-title">{book.titulo}</span>
        <p>{book.autor}</p>
      </div>
      <div className="card-action">
        <a href='livros' className="waves-effect waves-light btn">Reservar</a>
      </div>
    </div>
  );
};

export default BookCard;
