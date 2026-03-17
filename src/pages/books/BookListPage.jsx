import axios from "axios";
import { useEffect, useState } from "react";
import BookList from "../../components/books/BookList";

export default function BooksIndex() {
  const [books, setBooks] = useState([]);

  useEffect(fetchBooks, []);

  function fetchBooks() {
    axios.get("http://localhost:3000/books").then((res) => {
      setBooks(res.data.result);
    });
  }

  return (
    <>
      <h1>Catalogo libri</h1>
      <BookList books={books} />
    </>
  );
}
