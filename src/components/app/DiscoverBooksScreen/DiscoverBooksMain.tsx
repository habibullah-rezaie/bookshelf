import React from "react";
import { Stack } from "src/components/lib/Layout";
import { useSearchBookByParam } from "src/hooks/search";
import HorizontalBookLoader from "../BookCards/HorizontalBookLoader";
import ListHeading from "../HomePage/ListHeader";
import SearchRow from "./SearchBooks";
import SearchResultsSection from "./SearchResultsList";

function DiscoverBooksMain() {
	const {
		queryingObj: {
			data,
			isError,
			isLoading,
			isFetching,
			isSuccess,
			query,
			filters,
			hasNextPage,
			fetchNextPage,
			isFetchingNextPage,
		},
		// TODO: use these
		// parseError,
		// setQueryEnabled,
		search,
		queryEnabled: isQueried,
	} = useSearchBookByParam();

	const divRef = React.useRef<HTMLDivElement>(null);

	function handleSortChange(sortBy: "relevance" | "newest") {
		search(query, { ...filters, sortBy });
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
						<SearchRow
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
								query={query}
								filters={filters}
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
								<div className="h-28" key={Math.random().toString()}>
									<HorizontalBookLoader />
								</div>
							))}
						</div>
					)}
					{isError && !isLoading && (
						<div className="w-full flex items-center justify-center text-baseBlack font-poppins">
							Something went wrong :(
						</div>
					)}

					{/* When it is not queried, isLoading is true, that is because ReactQuery 
					ready to load the query however I have disabled */}
					{/* Instead we should use isFetching which means if is fetching in background or isFetching next page */}
					{!isQueried && !isFetching ? (
						<div className="w-full flex  items-center justify-center text-baseBlack font-poppins">
							Search! Results appear in here ;)
						</div>
					) : null}
				</main>
			</Stack>
		</div>
	);
}

export default DiscoverBooksMain;
