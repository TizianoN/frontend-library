export default function Rating({ vote, maxVote }) {
  function renderStars() {
    if (!vote) return "N/D";

    const stars = [];

    for (let i = 1; i <= maxVote; i++) {
      const starClass = i <= vote ? "bi-star-fill" : "bi-star";
      stars.push(<i key={i} className={`bi ${starClass} text-warning`}></i>);
    }

    return stars;
  }

  return <div>{renderStars()}</div>;
}
