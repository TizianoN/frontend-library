import { NavLink, Outlet } from "react-router";

export default function DefaultTemplate() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <a className="navbar-brand" href="#">
            Frontend Library
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/books" className="nav-link" aria-current="page">
                  Catalogo libri
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main>
        <div className="container py-5">
          <Outlet />
        </div>
      </main>
    </>
  );
}
