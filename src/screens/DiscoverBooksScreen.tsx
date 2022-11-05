import React from "react";
import { useSearchBookInfiniteLoading } from "src/api/hooks/searchBooks";
import SearchBox from "src/components/app/DiscoverBooksScreen/SearchBooks";
import SearchResultsSection from "src/components/app/DiscoverBooksScreen/SearchResultsList";
import ListHeading from "src/components/app/HomePage/ListHeader";
import { Stack } from "src/components/lib/Layout";

// TODO: Show sort bar on every State
// TODO:  Show loader
function DiscoverBooksScreen() {
	const [isQueried, setIsQueried] = React.useState<boolean>(false);

	const {
		data,
		error,
		isError,
		isLoading,
		isSuccess,
		query,
		search: onSearch,
		filters,
		hasNextPage,
		fetchNextPage,
		isFetchingNextPage,
	} = useSearchBookInfiniteLoading(10, isQueried);

	const divRef = React.useRef<HTMLDivElement>(null);

	const search: typeof onSearch = React.useCallback(
		(query, filters) => {
			if (!isQueried) setIsQueried(true);

			onSearch(query, filters);
		},
		[isQueried, onSearch]
	);

	function handleSortChange(sortBy: "relevance" | "newest") {
		onSearch(query, { ...filters, sortBy });
	}

	return (
		<div className="px-7">
			<Stack
				ref={divRef}
				direction="horizontal"
				gap={12}
				className="relative grid-cols-4 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12"
			>
				<main
					className="col-span-4 col-start-1 sm:col-span-6 sm:col-start-2 md:col-span-8 md:col-start-2 lg:col-span-10 lg:col-start-2"
					id="discover"
				>
					<ListHeading className="mt-6 mb-5">Search Books</ListHeading>
					<div className="relative pb-9">
						<SearchBox
							isQueried={isQueried}
							onSearch={search}
							query={query}
							filters={filters}
							isError={isError}
							isLoading={isLoading}
						/>
					</div>

					{isSuccess && data != null && (
						<>
							<SearchResultsSection
								data={data}
								onSortChange={handleSortChange}
								selectedSorting={filters.sortBy || "relevance"}
								fetchNextPage={fetchNextPage}
								hasNextPage={hasNextPage}
								isFetchingNextPage={isFetchingNextPage}
							/>
						</>
					)}
				</main>
			</Stack>
		</div>
	);
}

export default DiscoverBooksScreen;
