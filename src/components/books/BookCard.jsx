import { Link } from "react-router";
import Rating from "../ui/Rating";

export default function BookCard({ book }) {
  return (
    <div className="card book-card h-100">
      <img src={book.image} className="card-img-top" alt={book.title} />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <div className="card-text">
          <em>{book.author}</em>
          <div className="my-2">
            <Rating vote={book.average_vote} maxVote="5" />
          </div>
          <p>{book.abstract}</p>
        </div>

        <Link to={"/books/" + book.id}>See more</Link>
      </div>
    </div>
  );
}
