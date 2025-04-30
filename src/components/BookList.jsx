import React from 'react';

const BookList = ({ books }) => {
  if (!books || books.length === 0) {
    return <p>No books found. Try searching for something else.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <div className="book-card" key={book.id}>
          <div className="book-card-inner">
            <div className="book-card-front">
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x192?text=No+Image'}
                alt={book.volumeInfo.title}
                className="book-image"
              />
            </div>
            <div className="book-card-back">
              <h3 className="book-title">{book.volumeInfo.title}</h3>
              <p className="book-authors">{book.volumeInfo.authors?.join(', ') || 'Unknown Author'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;