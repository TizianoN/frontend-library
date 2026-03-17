import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import BookListPage from "./pages/books/BookListPage";
import BookDetailPage from "./pages/books/BookDetailPage";
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
            <Route index Component={BookListPage} />
            <Route path=":id" Component={BookDetailPage} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
