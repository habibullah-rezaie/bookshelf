import { SectionWithLoaderAndErrorBoundary } from "src/components/lib/Section";
import { BestsellerFilters } from "src/database/tables/BestsellerBook";
import { useSearchBestsellerByParam } from "src/hooks/search";
import BooksListWithLoadMore from "../BooksListWithLoadMore";
import ListHeading from "../HomePage/ListHeader";
import SearchBox from "../SearchBox";

function BestsellersScreenMain() {
	const {
		filters,
		parseError,
		query,
		queryEnabled,
		setQueryEnabled,
		search,
		queryObj: {
			data: searchResult,
			isError,
			isLoading,
			isFetchingNextPage,
			hasNextPage,
			fetchNextPage,
		},
	} = useSearchBestsellerByParam();

	const books =
		searchResult == null
			? []
			: searchResult.pages.flatMap((page) =>
					page.data && page.data instanceof Array ? page.data : []
			  );

	return (
		<div>
			<main className="mt-16 px-7">
				<SectionWithLoaderAndErrorBoundary
					className="pt-7"
					header={<ListHeading className="">Bestsellers</ListHeading>}
				>
					<div className="mt-9 mb-6">
						<SearchBox<BestsellerFilters>
							filters={filters}
							isError={isError}
							isLoading={isLoading}
							isQueried={queryEnabled}
							onSearch={search}
							query={query}
							shouldSearch={shouldSearch}
						/>
					</div>
					<BooksListWithLoadMore
						books={books}
						isFetchingNextPage={isFetchingNextPage}
						hasNextPage={hasNextPage}
						fetchNextPage={fetchNextPage}
						isLoading={isLoading}
					/>
				</SectionWithLoaderAndErrorBoundary>
			</main>
		</div>
	);
}

export default BestsellersScreenMain;

function shouldSearch(
	newFilters: BestsellerFilters,
	prevFilters: BestsellerFilters
) {
	if (newFilters.type !== prevFilters.type) return true;
	return false;
}
