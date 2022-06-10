import { Button } from "components/lib/Buttons";
import { Form, Input } from "components/lib/Forms";
import { Stack } from "components/lib/Layout";
import React, { FormEvent, useEffect, useState } from "react";
import { FaFilter, FaSearch, FaSpinner } from "react-icons/fa";
import { SearchFilters } from "types/DiscoverBooksScreenTypes";
const FiltersModal = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */ "components/app/DiscoverBooksScreen/FiltersModal"
    )
);

function useSearchWithFilters() {
  const [status, setStatus] = React.useState<
    "PENDING" | "IDLE" | "RESOLVED" | "REJECTED"
  >("IDLE");

  const [query, setQuery] = useState("");
  const [filters, setFilters] = React.useState<SearchFilters>({});
  const [filtersSubmitted, setFiltersSubmitted] = React.useState(false);

  // TODO: Search on filters submit button
  // however don't search on every filters change, meaning that if you change the filters, but you don't
  // click the filter button a search is not triggered. On the other hand, if you click the search button,
  // an immediate search is happening

  const search = React.useCallback(
    function search() {
      setStatus("PENDING");
      searchBook(query, filters).then(
        (result) => {
          setStatus("RESOLVED");
          // setBooks(result?.items);
        },
        (error) => {
          setStatus("REJECTED");
          throw error;
        }
      );
    },
    [filters, query]
  );

  const filtersRef = React.useRef(filters);
  //TODO: research on filter change
  useEffect(() => {
    if (filtersSubmitted && !isDeepStrictEqual(filtersRef.current, filters)) {
      filtersRef.current = filters;
      search();
      console.log("searched");
    }
  }, [filters, filtersSubmitted, search]);

  return {
    search,
    query,
    setQuery,
    filters,
    setFilters,
    status,
    setStatus,
    setFiltersSubmitted,
  };
}

function SearchBooks({ setBooks }: { setBooks(books: any[]): void }) {
  const [filterModalOpen, setFilterModalOpen] = React.useState(false);
  const { search, query, setQuery, setFilters, status, setFiltersSubmitted } =
    useSearchWithFilters();

  function closeFiltersModal() {
    setFilterModalOpen(false);
  }

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    search();
  }
  return (
    <>
      <Form className="" onSubmit={handleSubmit}>
        <Stack
          direction="horizontal"
          className="rounded-md ring-1 ring-opacity-40 ring-logoBlue focus-within:ring-2 focus-within:ring-opacity-20  focus-within:ring-logoBlue focus-within:border-[1px] focus-within:border-logoBlue max-w-full"
        >
          <label htmlFor="searchInput" className="sr-only">
            search for books
          </label>
          <Button
            variant="plain"
            type="button"
            className="px-1.5 bg-transparent rounded-sm rounded-l-none hover:bg transition-all duration-150 text-logoDarkGray hover:text-gray-700 active:text-gray-700"
            onClick={() => setFilterModalOpen(true)}
          >
            <FaFilter className="" />
          </Button>

          <Input
            role="searchbox"
            id="searchInput"
            className="w-48"
            value={query}
            onChange={(ev) => setQuery(ev.target.value)}
            autoFocus
          />
          <Button
            variant="plain"
            type="submit"
            className="px-1.5 bg-logoBlue rounded-sm rounded-l-none hover:bg transition-all duration-150"
          >
            {/* TODO: disable button */}
            {/* TODO: turn red on error */}
            {status === "PENDING" ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaSearch className="text-white" />
            )}
          </Button>
        </Stack>
      </Form>
      <React.Suspense
        fallback={
          <FaSpinner
            className="animate-spin fixed bottom-0 right-0 text-sm"
            title="still laoding"
          />
        }
      >
        <FiltersModal
          isOpen={filterModalOpen}
          onClose={closeFiltersModal}
          setFilters={setFilters}
          setFiltersSubmitted={setFiltersSubmitted}
        />
      </React.Suspense>
    </>
  );
}

function processQueryFilters(filters: SearchFilters): string {
  const hasQueryFilters =
    filters.author || filters.category || filters.isbn || filters.publisher;
  const paramFiltersMapping = {
    author: "+inauthor",
    category: "+subject",
    isbn: "+isbn",
    publisher: "+inpublisher",
  };

  if (hasQueryFilters) {
    let queryParam = "";
    for (const filter of Object.keys(paramFiltersMapping)) {
      //@ts-ignore
      if (filters[filter]) {
        //@ts-ignore
        queryParam += `${paramFiltersMapping[filter]}:${filters[filter]}`;
      }
    }

    return queryParam;
  }
  return "";
}

function searchBook(term: string, filters?: SearchFilters) {
  const baseURL = `${process.env.REACT_APP_BOOK_API}/volumes`;
  let finalURL = `${baseURL}?q=${term}`;

  if (filters) {
    const { downloadable, sortBy, language } = filters;
    const queryFilters = processQueryFilters(filters);
    const downloadableParam = downloadable ? "&download=epub" : "";
    const sortByParam = sortBy !== "newest" ? "" : "&orderBy=newest";
    const languageParam = language ? "&langRestrict=" + language : "";
    finalURL += `${queryFilters}${downloadableParam}${sortByParam}${languageParam}`;
  }

  return fetch(finalURL, { method: "GET" }).then(
    (res) => {
      console.log(finalURL);
      return res.json();
    },
    (err) => {
      throw err;
    }
  );
}

function isDeepStrictEqual(
  obj1: { [key: string]: any },
  obj2: { [key: string]: any }
) {
  const obj1Props = Object.getOwnPropertyNames(obj1);
  const obj2Props = Object.getOwnPropertyNames(obj2);

  // has same number of keys
  if (obj1Props.length !== obj2Props.length) return false;

  for (const key of obj1Props) {
    // has same keys
    if (!(key in obj2)) return false;
    if (typeof obj1[key] !== typeof obj2[key]) return false;
  }

  for (const key of obj1Props) {
    // keys has same values
    if (typeof obj1[key] !== "object") {
      if (obj1[key] !== obj2[key]) return false;
    } else {
      if (!isDeepStrictEqual(obj1[key], obj2[key])) return false;
    }
  }

  return true;
}
export default SearchBooks;
