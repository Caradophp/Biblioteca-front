import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={book.image} alt={book.title} />
      </div>
      <div className="card-content">
        <span className="card-title">{book.title}</span>
        <p>{book.author}</p>
      </div>
      <div className="card-action">
        <a href={`/book/${book.id}`} className="waves-effect waves-light btn">Reservar</a>
      </div>
    </div>
  );
};

export default BookCard;
