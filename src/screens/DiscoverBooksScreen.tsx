import BookCard from "components/app/DiscoverBooksScreen/BookCard";
import SearchBooks from "components/app/DiscoverBooksScreen/SearchBooks";
import SearchSkeletonLoader from "components/app/DiscoverBooksScreen/SearchSkeletonLoader";
import Header from "components/lib/Header";
import { Container, Stack } from "components/lib/Layout";
import Logo from "components/logo";
import * as React from "react";
import { BaseComponentStatuses, Book } from "types/types";

function DiscoverBooksScreen() {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [status, setStatus] = React.useState<BaseComponentStatuses>("IDLE");

  // TODO: Add pagination
  // TODO: Add result count

  return (
    <div className="w-full h-full relative px-2 text-sm">
      <Header
        Logo={<Logo className="max-h-8 md:max-h-12" />}
        userName="Habibullah"
        userProfileIMG="profile.jpg"
      />
      <Container className={`p1 pt-3 mt-14`}>
        <Stack
          direction="horizontal"
          gap={12}
          className="grid-cols-4 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12"
        >
          <main
            className="col-span-4 col-start-1 sm:col-span-6 sm:col-start-2 md:col-span-8 md:col-start-2 lg:col-span-10 lg:col-start-2"
            id="discover"
          >
            <Stack direction="vertical" gap={6} className="max-w-full">
              <h2 className="text-center">Discover Books Here</h2>
              <SearchBooks setBooks={setBooks} setStatus={setStatus} />
              <ul className="mt-2 flex flex-col justify-center space-y-3">
                {status === "PENDING" && (
                  <>
                    <SearchSkeletonLoader />
                    <SearchSkeletonLoader />
                  </>
                )}
                {status === "RESOLVED" && <></>}
              </ul>
              {status === "IDLE" && (
                <div>
                  <a href="#searchForBooks">Search</a> for books, results appear
                  here!
                </div>
              )}
              {/* {books.length > 0 ? (
                <ul className="mt-2 flex flex-col justify-center space-y-3">
                  <BookCard id="habibullah" />
                </ul>
              ) : (
                
              )} */}
            </Stack>
          </main>
        </Stack>
      </Container>
    </div>
  );
}

export default DiscoverBooksScreen;
