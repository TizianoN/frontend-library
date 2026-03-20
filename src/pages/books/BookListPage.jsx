import axios from "axios";
import { useEffect, useState } from "react";
import BookList from "../../components/books/BookList";
import { Link } from "react-router";
import { useLoaderContext } from "../../contexts/LoaderContext";

export default function BooksIndex() {
  const [books, setBooks] = useState([]);
  const { startLoading, endLoading } = useLoaderContext();

  useEffect(fetchBooks, []);

  function fetchBooks() {
    startLoading();

    axios
      .get("http://localhost:3000/books")
      .then((res) => {
        setBooks(res.data.result);
      })
      .catch((err) => {
        showNotification(err.message, "danger");
      })
      .finally(() => {
        endLoading();
      });
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="m-0">Book list</h1>

        <div className="d-flex gap-2 aling-items-center">
          <Link className="btn btn-primary" to="/books/create">
            Create book
          </Link>
        </div>
      </div>
      <BookList books={books} />
    </>
  );
}
