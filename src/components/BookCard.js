import React from 'react';

function BookCard({ book }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text">{book.author}</p>
          <a href={book.fileUrl} className="btn btn-primary" download>
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

export default BookCard;