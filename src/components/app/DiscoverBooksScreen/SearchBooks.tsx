import React, { FormEvent } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
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
	isError,
}: {
	query: string;
	filters: SearchFilters;
	onSearch: SearchHandler;
	isLoading: boolean;
	isError: boolean;
}) {
	const [filterModalOpen, setFilterModalOpen] = React.useState(false);

	const [query, setQuery] = React.useState<string>(finalQuery);
	const [filters, setFilters] = React.useState<SearchFilters>(finalFilters);
	const [filtersSubmitted, setFiltersSubmitted] = React.useState(false);

	React.useEffect(() => {
		if (filtersSubmitted) {
			onSearch(query, filters);
		}
	}, [filters, filtersSubmitted, onSearch, query]);

	function closeFiltersModal() {
		setFilterModalOpen(false);
	}

	function handleSubmit(ev: FormEvent<HTMLFormElement>) {
		ev.preventDefault();

		// Either newly submitted filters or original filters
		onSearch(query, filtersSubmitted ? filters : finalFilters);
	}

	return (
		<>
			<form
				className="w-full h-10 flex flex-row items-center justify-center space-x-2"
				onSubmit={handleSubmit}
			>
				<div className="w-64 h-9 flex flex-row ring-1 ring-opacity-40 ring-baseBlack focus-within:ring-2 focus-within:ring-opacity-20  focus-within:ring-baseBlack focus-within:border-[1px] focus-within:boring-baseBlack max-w-full transition-all duration-75">
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
						{isLoading ? (
							<FaSpinner className="animate-spin" />
						) : (
							<FaSearch className="" />
						)}
					</Button>

					<Input
						role="searchbox"
						id="searchInput"
						className="flex-1"
						placeholder="Search"
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
