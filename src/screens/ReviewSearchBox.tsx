import React, { FormEvent } from "react";
import { FaSearch, FaSpinner, FaTimes } from "react-icons/fa";
import { useLocation, useSearchParams } from "react-router-dom";
import { Button } from "src/components/lib/Buttons/Buttons";
import { Input } from "src/components/lib/Forms";
import Filter from "./Filter";

export type ReviewFilters = {
	rating?: number;
	sortBy?: "popular" | "newest" | "relevance";
};

function ReviewSearchBox({
	onSearch,
	filters: finalFilters,
	query: finalQuery,
	isLoading,
	isQueried,
	isError,
}: {
	query: string;
	filters: ReviewFilters;

	onSearch: (query: string, filters: ReviewFilters) => void;
	isLoading: boolean;
	isQueried: boolean;
	isError: boolean;
}) {
	const [filterModalOpen, setFilterModalOpen] = React.useState(false);

	const [query, setQuery] = React.useState<string>(finalQuery);
	const [hasChangedFilter, setHasChangedFilter] = React.useState(false);
	const [filters, setFilters] = React.useState<ReviewFilters>(finalFilters);
	const [filtersSubmitted, setFiltersSubmitted] = React.useState(false);
	const location: any = useLocation();

	const [params] = useSearchParams();
	React.useEffect(() => {
		const queryParam = decodeURIComponent(params.get("q") || "");
		const filtersParamJson = decodeURIComponent(params.get("filters") || "{}");
		let filtersParam: ReviewFilters | null = null;
		try {
			filtersParam = JSON.parse(filtersParamJson);
		} catch (err) {
			console.log(err);
		}

		if (!hasChangedFilter && (queryParam || filtersParam)) {
			queryParam && setQuery(queryParam);
			filtersParam && setFilters(filtersParam);
			setHasChangedFilter(true);
		}
	}, [hasChangedFilter, location.state, params]);

	React.useEffect(() => {
		if (filtersSubmitted) {
			// If any of these fields are filled submit search
			if (shouldSearch(filters, finalFilters.sortBy)) onSearch(query, filters);
		}
	}, [filters, filtersSubmitted, finalFilters.sortBy, onSearch, query]);

	function closeFiltersModal() {
		setFilterModalOpen(false);
	}

	const handleSubmit = React.useCallback(
		function handleSubmit(ev?: FormEvent<HTMLFormElement>) {
			ev?.preventDefault();

			// Either newly submitted filters or original filters
			const searchFilters = filtersSubmitted ? filters : finalFilters;

			// If any of these fields are filled submit search or a query
			if (
				shouldSearch(searchFilters, finalFilters.sortBy) ||
				query !== finalQuery
			)
				onSearch(query, searchFilters);
		},
		[filters, filtersSubmitted, finalFilters, finalQuery, onSearch, query]
	);

	React.useEffect(() => {
		if (!isLoading) {
			const id = setTimeout(handleSubmit, 500);
			return () => clearTimeout(id);
		}
	}, [handleSubmit, isLoading, query]);

	return (
		<>
			<form
				className="w-full h-10 flex flex-row items-center justify-center space-x-2"
				onSubmit={handleSubmit}
			>
				<div
					className={`w-fit h-9 flex flex-row rounded-2xl focus-within:outline focus-within:outline-offset-2 focus-within:outline-baseBlack focus-within:outline-1 bg-white outline outline-1 outline-offset-2 outline-baseBlackBorder ${
						isError
							? `focus-within:ring-red-600 ring-red-600`
							: `focus-within:ring-baseBlack ring-baseBlack`
					} max-w-full transition-all duration-75`}
				>
					<div className="w-64 flex flex-row rounded-2xl">
						<label htmlFor="searchInput" className="sr-only">
							search for books
						</label>

						<Button
							variant="plain"
							type="submit"
							className="w-fit px-1.5 text-center text-darkGray transition-all duration-150 bg-white rounded-l-2xl"
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
						className="flex flex-row space-x-1 justify-center items-center w-[5.8rem] h-9 col-end-12 px-3.5 bg-baseBlack text-white transition-all duration-150 rounded-2xl focus:outline-baseBlack focus:outline-1"
						variant="plain"
						type="button"
						onClick={() => setFilterModalOpen(true)}
					>
						<div className="">
							<Filter />
						</div>
						<span>Filter</span>
					</Button>
				</div>
			</form>

			{/* <FilterModalLander
				closeFiltersModal={closeFiltersModal}
				filterModalOpen={filterModalOpen}
				setFilters={setFilters}
				setFiltersSubmitted={setFiltersSubmitted}
			/> */}
		</>
	);
}

export default ReviewSearchBox;

/**
 * Takes a filter an determines of the filters contains fields
 * that bring up resutls
 * @returns boolean
 */
function shouldSearch(
	filters: ReviewFilters,
	previousSortBy: ReviewFilters["sortBy"]
) {
	return filters.rating != null || filters.sortBy !== previousSortBy
		? true
		: false;
}
