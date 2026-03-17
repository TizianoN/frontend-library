import { Link } from "react-router";

export default function BookCard({ book }) {
  return (
    <div className="card h-100">
      <img src={book.image} className="card-img-top" alt={book.title} />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">{book.avg_vote}/5</p>
        <Link to={"/books/" + book.id}>See more</Link>
      </div>
    </div>
  );
}
