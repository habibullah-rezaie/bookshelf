import { Button } from "components/lib/Buttons";
import { Form, Input } from "components/lib/Forms";
import { Stack } from "components/lib/Layout";
import React, { FormEvent, useEffect, useState } from "react";
import { FaFilter, FaSearch, FaSpinner } from "react-icons/fa";
import { SearchFilters, SearchResult } from "types/DiscoverBooksScreenTypes";
import { BaseComponentStatuses } from "types/types";
import { isDeepStrictEqual } from "utils/utils";
const FiltersModal = React.lazy(
  () =>
    import(
      /* webpackPrefetch: true */ "components/app/DiscoverBooksScreen/FiltersModal"
    )
);

function useSearchWithFilters({
  setExternalStatus,
  onSuccess,
}: {
  setExternalStatus<T extends BaseComponentStatuses>(status: T): void;
  onSuccess(result: SearchResult): void;
}) {
  const [status, setInnerStatus] =
    React.useState<BaseComponentStatuses>("IDLE");

  const [query, setQuery] = useState("");
  const [filters, setFilters] = React.useState<SearchFilters>({});
  const [filtersSubmitted, setFiltersSubmitted] = React.useState(false);

  const setStatus = React.useCallback(
    function (status: BaseComponentStatuses) {
      setInnerStatus(status);
      setExternalStatus(status);
    },
    [setExternalStatus]
  );

  const search = React.useCallback(
    function search() {
      setStatus("PENDING");
      searchBook(query, filters).then(
        (result) => {
          setStatus("RESOLVED");
          onSuccess(result);
        },
        (error) => {
          setStatus("REJECTED");
          throw error;
        }
      );
    },
    [filters, onSuccess, query, setStatus]
  );

  const filtersRef = React.useRef(filters);
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

function SearchBooks({
  setResult,
  setStatus,
}: {
  setResult(result: SearchResult): void;
  setStatus<T extends BaseComponentStatuses>(status: T): void;
}) {
  const [filterModalOpen, setFilterModalOpen] = React.useState(false);
  const { search, query, setQuery, setFilters, status, setFiltersSubmitted } =
    useSearchWithFilters({
      setExternalStatus: setStatus,
      onSuccess: setResult,
    });

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

export default SearchBooks;
