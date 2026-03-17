import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import BookList from "./pages/books/BookList";
import BookDetail from "./pages/books/BookDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* SITE ROUTES */}
        <Route index Component={HomePage} />

        {/* BOOK ROUTES */}
        <Route path="books">
          <Route index Component={BookList} />
          <Route path=":id" Component={BookDetail} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
