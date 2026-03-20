import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import BookListPage from "./pages/books/BookListPage";
import BookDetailPage from "./pages/books/BookDetailPage";
import BookCreatePage from "./pages/books/BookCreatePage";
import DefaultTemplate from "./templates/DefaultTemplate";
import { LoaderContextProvider } from "./contexts/LoaderContext";
import { NotificationContextProvider } from "./contexts/NotificationContext";

export default function App() {
  return (
    <NotificationContextProvider>
      <LoaderContextProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultTemplate}>
              {/* SITE ROUTES */}
              <Route index Component={HomePage} />

              {/* BOOK ROUTES */}
              <Route path="books">
                <Route index Component={BookListPage} />
                <Route path=":id" Component={BookDetailPage} />
                <Route path="create" Component={BookCreatePage} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </LoaderContextProvider>
    </NotificationContextProvider>
  );
}
