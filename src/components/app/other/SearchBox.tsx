import React, { FormEvent } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import SearchBoxWithFilter from "src/components/lib/SearchBoxWithFilter";

function SearchBox<FiltersType>({
	onSearch,
	filters: finalFilters,
	query: finalQuery,
	isLoading,
	isQueried,
	isError,
	shouldSearch,
}: {
	query: string;
	filters: FiltersType;
	shouldSearch: (newFilters: FiltersType, prevFilters: FiltersType) => boolean;
	onSearch: (query: string, filters: FiltersType) => void;
	isLoading: boolean;
	isQueried: boolean;
	isError: boolean;
}) {
	const [filterModalOpen, setFilterModalOpen] = React.useState(false);

	const [query, setQuery] = React.useState<string>(finalQuery);
	const [hasChangedFilter, setHasChangedFilter] = React.useState(false);
	const [filters, setFilters] = React.useState<FiltersType>(finalFilters);
	const [filtersSubmitted, setFiltersSubmitted] = React.useState(false);
	const location: any = useLocation();

	const [params] = useSearchParams();
	React.useEffect(() => {
		const queryParam = decodeURIComponent(params.get("q") || "");
		const filtersParamJson = decodeURIComponent(params.get("filters") || "{}");
		let filtersParam: FiltersType | null = null;
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
			if (shouldSearch(filters, finalFilters)) onSearch(query, filters);
		}
	}, [filters, filtersSubmitted, finalFilters, onSearch, query, shouldSearch]);

	function closeFiltersModal() {
		setFilterModalOpen(false);
	}

	const handleSubmit = React.useCallback(
		function handleSubmit(ev?: FormEvent<HTMLFormElement>) {
			ev?.preventDefault();

			// Either newly submitted filters or original filters
			const searchFilters = filtersSubmitted ? filters : finalFilters;

			// If any of these fields are filled submit search or a query
			if (shouldSearch(searchFilters, finalFilters) || query !== finalQuery)
				onSearch(query, searchFilters);
		},
		[
			filters,
			filtersSubmitted,
			finalFilters,
			finalQuery,
			onSearch,
			query,
			shouldSearch,
		]
	);

	React.useEffect(() => {
		if (!isLoading) {
			const id = setTimeout(handleSubmit, 500);
			return () => clearTimeout(id);
		}
	}, [handleSubmit, isLoading, query]);

	return (
		<>
			<SearchBoxWithFilter
				handleSubmit={handleSubmit}
				isError={isError}
				isLoading={isLoading}
				isQueried={isQueried}
				query={query}
				onChange={setQuery}
				openModal={() => setFilterModalOpen(true)}
			/>
			{/* <FilterModalLander
				closeFiltersModal={closeFiltersModal}
				filterModalOpen={filterModalOpen}
				setFilters={setFilters}
				setFiltersSubmitted={setFiltersSubmitted}
			/> */}
		</>
	);
}

export default SearchBox;

/**
 * Takes a filter an determines of the filters contains fields
 * that bring up resutls
 * @returns boolean
 */
