import React from "react";
import { BaseComponentStatuses, Book, BriefBook } from "src/types/types";
import DetailedBookCard, { BriefBookCard } from "./BookCard";
import SerachBookLoader from "./SearchBookLoader";

function DetailedBooksList({
  books,
  status,
  className = "",
}: {
  books: Book[];
  status: BaseComponentStatuses;
  className?: string;
}) {
  return (
    <ul className="mt-2 flex flex-col justify-center space-y-3">
      {status === "PENDING" && <SerachBookLoader />}
      {status === "RESOLVED" && (
        <>
          {books?.length && books?.length > 0
            ? books.map((book, i) => {
                return (
                  <li key={book.id}>
                    <DetailedBookCard book={book} />
                  </li>
                );
              })
            : "Opps! nothing found :("}
        </>
      )}
      {status === "IDLE" && (
        <div>
          <a href="#searchForBooks">Search results appear here!</a>
        </div>
      )}
    </ul>
  );
}

export function BriefBooksList({
  books,
  className = "",
}: {
  books: BriefBook[];
  className?: string;
}) {
  console.log(books);
  return (
    <ul className={`mt-2 flex flex-col justify-center space-y-3 ${className}`}>
      <>
        {books.length > 0
          ? books.map((book) => {
              return (
                <li key={`${book.bookImage}`}>
                  <BriefBookCard book={book} />
                </li>
              );
            })
          : `We're all caught up now.`}
      </>
    </ul>
  );
}

export default DetailedBooksList;
