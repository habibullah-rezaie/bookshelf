import React from "react";
import { SearchResult } from "types/DiscoverBooksScreenTypes";
import BookCard from "./BookCard";
import { BaseComponentStatuses, Book } from "src/types/types";
import SerachBookLoader from "./SearchBookLoader";

function BooksList({
  books,
  status,
}: {
  books: Book[];
  status: BaseComponentStatuses;
}) {
  return (
    <ul className="mt-2 flex flex-col justify-center space-y-3">
      {status === "PENDING" && <SerachBookLoader />}
      {status === "RESOLVED" && (
        <>
                return (
                  <li key={book.id}>
                    <BookCard book={book} />
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

export default BooksList;
