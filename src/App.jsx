import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import Pagination from './components/Pagination';
import './styles/App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', image: null });

  const booksPerPage = 10;

  const fetchBooks = async (query, page) => {
    try {
      const startIndex = (page - 1) * booksPerPage;
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${booksPerPage}`
      );
      const data = await response.json();
      setBooks(data.items || []);
      setTotalItems(data.totalItems || 0);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks('javascript', 1);
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCurrentPage(1);
    fetchBooks(query, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchBooks(searchTerm || 'javascript', page); 
  };

  const handleUploadClick = () => {
    setShowUploadModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewBook({ ...newBook, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = () => {
    const book = {
      id: Date.now(),
      volumeInfo: {
        title: newBook.title,
        authors: [newBook.author],
        imageLinks: { thumbnail: newBook.image },
      },
    };
    setBooks([book, ...books]);
    setShowUploadModal(false);
    setNewBook({ title: '', author: '', image: null });
  };

  return (
    <div className="app">
      <h1>Let’s Find That Book</h1>
      <SearchBar onSearch={handleSearch} onUpload={handleUploadClick} />
      <BookList books={books} />
      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={booksPerPage}
        onPageChange={handlePageChange}
      />

      {showUploadModal && (
        <div className="upload-modal">
          <div className="upload-modal-content">
            <h2>Add a New Book</h2>
            <input
              type="text"
              placeholder="Book Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <button onClick={handleUploadSubmit} disabled={!newBook.title || !newBook.author || !newBook.image}>
              Add Book
            </button>
            <button onClick={() => setShowUploadModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;