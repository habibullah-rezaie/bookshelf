import React from "react";
import { SearchResult } from "types/DiscoverBooksScreenTypes";
import { BaseComponentStatuses } from "types/types";
import BookCard from "./BookCard";
import SerachBookLoader from "./SearchBookLoader";

function BooksList({
  result,
  status,
}: {
  result?: SearchResult;
  status: BaseComponentStatuses;
}) {
  return (
    <ul className="mt-2 flex flex-col justify-center space-y-3">
      {status === "PENDING" && <SerachBookLoader />}
      {status === "RESOLVED" && (
        <>
          {result?.items?.length && result.items.length > 0
            ? result.items.map((book, i) => {
                return (
                  <li>
                    <BookCard key={book.id} book={book} />
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
