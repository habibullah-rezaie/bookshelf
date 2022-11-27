import { Button } from "src/components/lib/Buttons/Buttons";
import { SectionWithLoaderAndErrorBoundary } from "src/components/lib/Section";
import { BestsellerFilters } from "src/database/tables/BestsellerBook";
import { useSearchBestsellerByParam } from "src/hooks/search";
import { getBookDetailLink } from "src/utils/book";
import HorizontalBookCard from "../BookCards/HorizontalBookCard";
import HorizontalBookLoader from "../BookCards/HorizontalBookLoader";
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

					<div></div>
					<ul className="grid grid-cols-1 gap-y-4">
						{books.map((book) => (
							<HorizontalBookCard
								book={book}
								link={{ to: getBookDetailLink(book.bookId) }}
							/>
						))}
						{!isFetchingNextPage && hasNextPage ? (
							<div className="w-full flex items-center justify-center ">
								<Button
									onClick={() => {
										fetchNextPage();
									}}
								>
									Load More
								</Button>
							</div>
						) : isFetchingNextPage ? (
							<HorizontalBookLoader />
						) : (
							!isLoading &&
							!hasNextPage &&
							books.length === 0 && <div>No reviews found :(</div>
						)}
					</ul>
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
