import Rating from "../../components/ui/Rating";

export default function ReviewCard({ review }) {
  return (
    <div className="review-item p-2 border-bottom align-items-center d-flex gap-3">
      <div>
        <div className="review-avatar">{review.name[0]}</div>
      </div>
      <div className="review-username">
        <strong>{review.name} </strong>
      </div>
      <div className="flex-grow-1">{review.text}</div>
      <div>
        <Rating vote={review.vote} maxVote={5} />
      </div>
    </div>
  );
}
