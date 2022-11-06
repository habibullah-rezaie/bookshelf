import React from "react";
import { useSearchBookInfiniteLoading } from "src/api/hooks/searchBooks";
import HorizontalBookCard from "src/components/app/BookCards/HorizontalBookCard";
import HorizontalBookLoader from "src/components/app/BookCards/HorizontalBookLoader";
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

					{isQueried && isLoading && (
						<div
							// 19 bottom of `SearchRow` margin included
							className={`h-[calc(100vh-19rem)] w-full flex flex-col space-y-6 overflow-hidden`}
						>
							{new Array(10).fill(0).map((_, i) => (
								<div className="h-28">
									<HorizontalBookLoader key={i} />
								</div>
							))}
						</div>
					)}
					{isError && !isLoading && (
						<div className="w-full flex items-center justify-center text-baseBlack font-poppins">
							Something went wrong :(
						</div>
					)}

					{/* When it is not queried is Loading is true, why? Then shouldn't include that */}
					{!isQueried ? (
						<div className="w-full flex  items-center justify-center text-baseBlack font-poppins">
							Search! Results appear in here ;)
						</div>
					) : null}
				</main>
			</Stack>
		</div>
	);
}

export default DiscoverBooksScreen;
