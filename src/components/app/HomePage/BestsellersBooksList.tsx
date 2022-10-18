import React from "react";
import { Resource } from "src/client/resource";
import { BriefBooksList } from "../DiscoverBooksScreen/BooksList";

function BestsellersBooksList({
  bestsellerType,
  resource,
}: {
  bestsellerType: BestsellerType;
  resource: Resource<BestsellerBook[]>;
}) {
  const listHeader =
    bestsellerType === "FICTION"
      ? "Fiction Bestsellers"
      : "Non-Fiction Bestsellers";

  return (
    <section>
      <h3>{listHeader}</h3>
      <React.Suspense fallback={<div>Loading ...</div>}>
        <div>
          <BestsellersListBody
            resource={resource}
            bestsellerType={bestsellerType}
          />
        </div>
      </React.Suspense>
    </section>
  );
}

export default BestsellersBooksList;
function BestsellersListBody({
  resource,
  bestsellerType,
}: {
  resource: Resource<BestsellerBook[]>;
  bestsellerType: BestsellerType;
}) {
  const books = resource.read();
  return (
    <BriefBooksList
      books={books
        .filter((book) => book.type === bestsellerType)
        .map(({ author, primaryISBN10, primaryISBN13, title, bookImage }) => ({
          author,
          bookImage,
          primaryISBN10,
          primaryISBN13,
          title,
        }))}
    />
  );
}
