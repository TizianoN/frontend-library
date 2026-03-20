import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useLoaderContext } from "../../contexts/LoaderContext";

import axios from "axios";
import Rating from "../../components/ui/Rating";
import ReviewCard from "../../components/reviews/ReviewCard";
import ReviewForm from "../../components/reviews/ReviewForm";

export default function BooksIndex() {
  const { id } = useParams();
  const [book, setBook] = useState();
  const { startLoading, endLoading } = useLoaderContext();

  useEffect(fetchBook, []);

  function fetchBook() {
    startLoading();

    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => {
        const book = res.data.result;

        let voteSum = 0;
        book.reviews.forEach((review) => {
          voteSum += review.vote;
        });
        const averageVote = Math.ceil(voteSum / book.reviews.length);

        book.average_vote = averageVote;

        setBook(book);
      })
      .catch((err) => {
        showNotification(err.message, "danger");
      })
      .finally(() => {
        endLoading();
      });
  }

  if (!book) return <></>;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="m-0">{book.title}</h1>

        <div className="d-flex gap-2 aling-items-center">
          <Link className="btn btn-primary" to="/books">
            Back to list
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          <img src={book.image} className="img-fluid" />
        </div>
        <div className="col-10">
          <div className="mb-2 border-bottom">
            <strong>Written by:</strong>
            <address>
              <em>{book.author}</em>
            </address>
          </div>
          <div className="mb-2 border-bottom">
            <strong>Rating:</strong>
            <address>
              <Rating vote={book.average_vote} maxVote={5} />
            </address>
          </div>
          <div className="mb-2 border-bottom">
            <strong>Abstract:</strong>
            <p>{book.abstract}</p>
          </div>
        </div>
      </div>

      <section className="my-5">
        <h2 className="mb-3">Reviews</h2>

        {book.reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </section>

      <section className="my-5">
        <ReviewForm bookId={id} afterFormSubmit={fetchBook} />
      </section>
    </>
  );
}
