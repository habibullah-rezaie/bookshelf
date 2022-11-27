import React, { FormEvent } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { SearchHandler } from "src/api/hooks/searchBooks";
import SearchBoxWithFilter from "src/components/lib/SearchBoxWithFilter";
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
	const [hasChangedFilter, setHasChangedFilter] = React.useState(false);
	const [filters, setFilters] = React.useState<SearchFilters>(finalFilters);
	const [filtersSubmitted, setFiltersSubmitted] = React.useState(false);
	const location: any = useLocation();

	const [params] = useSearchParams();
	React.useEffect(() => {
		const queryParam = decodeURIComponent(params.get("q") || "");
		const filtersParamJson = decodeURIComponent(params.get("filters") || "{}");
		let filtersParam: SearchFilters | null = null;
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
			if (shouldSearch(filters)) onSearch(query, filters);
		}
	}, [filters, filtersSubmitted, onSearch, query]);

	function closeFiltersModal() {
		setFilterModalOpen(false);
	}

	function handleSubmit(ev?: FormEvent<HTMLFormElement>) {
		ev?.preventDefault();

		// Either newly submitted filters or original filters
		const searchFilters = filtersSubmitted ? filters : finalFilters;

		// If any of these fields are filled submit search or a query
		if (shouldSearch(searchFilters) || query) onSearch(query, searchFilters);
	}

	return (
		<>
			<SearchBoxWithFilter
				handleSubmit={handleSubmit}
				isError={isError}
				isLoading={isLoading}
				isQueried={isQueried}
				query={query}
				openModal={() => setFilterModalOpen(true)}
				onChange={setQuery}
				inputLabel={"search books"}
			/>
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
