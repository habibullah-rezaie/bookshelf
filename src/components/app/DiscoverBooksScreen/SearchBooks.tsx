import React, { FormEvent } from "react";
import { FaSearch, FaSpinner, FaTimes } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { SearchHandler } from "src/api/hooks/searchBooks";
import { Button } from "src/components/lib/Buttons/Buttons";
import { Input } from "src/components/lib/Forms";
import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";
import FilterModalLander from "./FilterModalLander";

export type FiltersSetter = React.Dispatch<React.SetStateAction<SearchFilters>>;

function SearchRow({
	onSearch,
	filters: finalFilters,
	query: finalQuery,
	isLoading,
	isQueried,
	isError,
}: {
	query: string;
	filters: SearchFilters;
	onSearch: SearchHandler;
	isLoading: boolean;
	isQueried: boolean;
	isError: boolean;
}) {
	const [filterModalOpen, setFilterModalOpen] = React.useState(false);

	const [query, setQuery] = React.useState<string>(finalQuery);
	const [filters, setFilters] = React.useState<SearchFilters>(finalFilters);
	const [filtersSubmitted, setFiltersSubmitted] = React.useState(false);

	React.useEffect(() => {
		if (filtersSubmitted) {
			// If any of these fields are filled submit search
			if (shouldSearch(filters)) onSearch(query, filters);
		}
	}, [filters, filtersSubmitted, onSearch, query]);

	function closeFiltersModal() {
		setFilterModalOpen(false);
	}

	function handleSubmit(ev: FormEvent<HTMLFormElement>) {
		ev.preventDefault();

		// Either newly submitted filters or original filters
		const searchFilters = filtersSubmitted ? filters : finalFilters;

		// If any of these fields are filled submit search or a query
		if (shouldSearch(searchFilters) || query) onSearch(query, searchFilters);
	}

	return (
		<>
			<form
				className="w-full h-10 flex flex-row items-center justify-center space-x-2"
				onSubmit={handleSubmit}
			>
				<div
					className={`w-64 h-9 flex flex-row ring-1 ring-opacity-40 focus-within:ring-2 focus-within:ring-opacity-20  ${
						isError
							? `focus-within:ring-red-600 ring-red-600`
							: `focus-within:ring-baseBlack ring-baseBlack`
					} focus-within:border-[1px] max-w-full transition-all duration-75`}
				>
					<label htmlFor="searchInput" className="sr-only">
						search for books
					</label>

					<Button
						variant="plain"
						type="submit"
						className="w-fit px-1.5 text-center text-darkGray transition-all duration-150"
					>
						{/* TODO: disable button */}
						{/* TODO: turn red on error */}
						{isLoading && isQueried ? (
							<FaSpinner className="animate-spin" />
						) : isError ? (
							<FaTimes className="text-red-500" />
						) : (
							<FaSearch className="" />
						)}
					</Button>

					<Input
						role="searchbox"
						id="searchInput"
						className="flex-1"
						placeholder="Search or use filters on right"
						value={query}
						onChange={(ev) => setQuery(ev.target.value)}
						// autoFocus
					/>
				</div>

				<Button
					className="flex flex-row justify-center items-center w-14 h-9 col-end-12 px-1 bg-baseBlack text-white  rounded-sm rounded-l-none hover:bg transition-all duration-150 hover:ring-1 hover:ring-baseBlack  active:ring-1  active:ring-baseBlack"
					variant="plain"
					type="button"
					onClick={() => setFilterModalOpen(true)}
				>
					<VscSettings className="h-4 -rotate-90" />
				</Button>
			</form>

			<FilterModalLander
				closeFiltersModal={closeFiltersModal}
				filterModalOpen={filterModalOpen}
				setFilters={setFilters}
				setFiltersSubmitted={setFiltersSubmitted}
			/>
		</>
	);
}

export default SearchRow;

/**
 * Takes a filter an determines of the filters contains fields
 * that bring up resutls
 * @returns boolean
 */
function shouldSearch(filters: SearchFilters) {
	return filters.author ||
		filters.category ||
		filters.isbn ||
		filters.publisher ||
		filters.title
		? true
		: false;
}
