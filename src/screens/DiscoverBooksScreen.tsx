import React from "react";
import { useSearchBookBox } from "src/api/hooks/searchBooks";
import SearchBox from "src/components/app/DiscoverBooksScreen/SearchBooks";
import SearchResultsSection from "src/components/app/DiscoverBooksScreen/SearchResultsList";
import ListHeading from "src/components/app/HomePage/ListHeader";
import { Button } from "src/components/lib/Buttons/Buttons";
import ScrollDirection from "src/components/lib/Icons/ScrollDirection";
import { Stack } from "src/components/lib/Layout";
import Pagination from "src/components/lib/Lists/Pagination";

// TODO: Show sort bar on every State
// TODO:  Show loader
function DiscoverBooksScreen() {
	const {
		data,
		error,
		isError,
		isLoading,
		isSuccess,
		query,
		search,
		filters,
		page,
		setPage,
		hasNextPage,
	} = useSearchBookBox(10);

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
						<SearchBox
							onSearch={search}
							query={query}
							filters={filters}
							isError={isError}
							isLoading={isLoading}
						/>
					</div>

					{isSuccess && data.totalItems && data.items instanceof Array && (
						<>
							<SearchResultsSection
								data={data}
								onSortChange={handleSortChange}
								selectedSorting={filters.sortBy || "relevance"}
							/>

							<Button
								variant="plain"
								className="fixed bottom-28 right-10 w-10 h-10 z-10 flex items-center justify-center rounded-[100%] bg-baseBlack text-white"
								title="Scroll to Search"
								onClick={() => divRef.current?.scrollIntoView()}
							>
								<ScrollDirection direction="UP" className="w-8 h-8" />
							</Button>

							<Pagination
								page={page}
								pageSize={10}
								totalItems={data.totalItems}
								hasNextPage={hasNextPage}
								onNextPage={() => setPage((page) => page + 1)}
								onPreviousPage={() =>
									setPage((page) => {
										console.log("changed paged");
										return page > 0 ? page - 1 : page;
									})
								}
							/>
						</>
					)}
				</main>
			</Stack>
		</div>
	);
}

export default DiscoverBooksScreen;
