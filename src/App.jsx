import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import BookList from "./pages/books/BookList";
import BookDetail from "./pages/books/BookDetail";
import DefaultTemplate from "./templates/DefaultTemplate";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={DefaultTemplate}>
          {/* SITE ROUTES */}
          <Route index Component={HomePage} />

          {/* BOOK ROUTES */}
          <Route path="books">
            <Route index Component={BookList} />
            <Route path=":id" Component={BookDetail} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
