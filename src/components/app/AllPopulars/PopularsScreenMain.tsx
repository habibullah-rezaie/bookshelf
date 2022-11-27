import { SectionWithLoaderAndErrorBoundary } from "src/components/lib/Section";
import { MostPopularFilters } from "src/database/tables/MostPopularBook";
import { useSearchPopularsByParam } from "src/hooks/search";
import BooksListWithLoadMore from "../BooksListWithLoadMore";
import ListHeading from "../HomePage/ListHeader";
import SearchBox from "../SearchBox";

function PopularsScreenMain() {
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
	} = useSearchPopularsByParam();

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
					header={<ListHeading className="">Popular Books</ListHeading>}
				>
					<div className="mt-9 mb-6">
						<SearchBox<MostPopularFilters>
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

export default PopularsScreenMain;

function shouldSearch(
	newFilters: MostPopularFilters,
	prevFilters: MostPopularFilters
) {
	if (newFilters.period !== prevFilters.period) return true;
	return false;
}
