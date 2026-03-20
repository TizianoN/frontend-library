import BookCard from "./BookCard";

export default function BookList({ books }) {
  return (
    <div className="row row-cols-3 g-5">
      {books.map((book) => (
        <div className="col" key={book.id}>
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
}
