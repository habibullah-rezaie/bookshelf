import { useParams } from "react-router-dom";
import { useGoogleBasicBookInfo } from "src/api/hooks/bookDetails";
import { Button } from "src/components/lib/Buttons/Buttons";
import { WhiteShadowedContiainer } from "src/components/lib/Header/Container";
import SquareLoader from "src/components/lib/Loaders/SquareLoader";
import { useSearchReviewByParam } from "src/hooks/search";
import ReviewSearchBox from "src/screens/ReviewSearchBox";
import { getBookDetailLink } from "src/utils/book";
import HorizontalBookCard from "../BookCards/HorizontalBookCard";
import HorizontalBookLoader from "../BookCards/HorizontalBookLoader";
import { ReviewsListBody } from "../BookDetailsScreen/ReviewsList";

function BookAllReviewsMain() {
	const { bookId } = useParams();
	const {
		data: bookInfo,
		isLoading: isBookInfoLoading,
		isError: isBookInfoErr,
	} = useGoogleBasicBookInfo(bookId || "");

	const {
		queryObj: {
			isError,
			isLoading,
			isFetching,
			data: searchResult,
			hasNextPage,
			fetchNextPage,
			isFetchingNextPage,
		},
		filters,
		query,
		queryEnabled,
		parseError,
		search,
		setQueryEnabled,
	} = useSearchReviewByParam(bookId || "");

	console.log("DATA in here", searchResult);

	const baseClassName = "px-7";

	if (!bookId)
		return <main className={`${baseClassName}`}>404 Page not found</main>;
	if (isBookInfoErr)
		return <main className={`${baseClassName}`}>Something went wrong</main>;

	const reviews =
		searchResult == null
			? []
			: searchResult.pages.flatMap((page) =>
					page.data && page.data instanceof Array ? page.data : []
			  );

	return (
		<main className={`${baseClassName} flex flex-col items-center space-y-4`}>
			{isBookInfoLoading ? (
				<HorizontalBookLoader />
			) : (
				<HorizontalBookCard
					book={{ ...bookInfo, averageRating: 0, primaryISBN13: "" }}
					link={{ to: getBookDetailLink(bookId) }}
				/>
			)}
			<ReviewSearchBox
				filters={filters}
				isError={isError}
				isLoading={isLoading}
				isQueried={queryEnabled}
				onSearch={search}
				query={query}
			/>

			<ReviewsListBody bookReviews={reviews}>
				{!isFetchingNextPage && hasNextPage ? (
					<div className="self-center">
						<Button
							onClick={() => {
								fetchNextPage();
							}}
						>
							Load More
						</Button>
					</div>
				) : isFetchingNextPage ? (
					<ReviewLoader />
				) : (
					!isLoading &&
					!hasNextPage &&
					reviews.length === 0 && <div>No reviews found :(</div>
				)}
			</ReviewsListBody>
		</main>
	);
}

export default BookAllReviewsMain;

export function ReviewLoader() {
	return (
		<WhiteShadowedContiainer>
			<div className="relative flex flex-col space-y-2 px-3 py-4 ">
				<div className="flex flex-row justify-between">
					<div className="w-full flex flex-row space-x-3">
						<div className="w-8 h-8">
							<SquareLoader className=" rounded-[100%]" />
						</div>

						<div className="h-full flex-1 flex flex-col space-y-0.5">
							<div className="h-4 w-20">
								<SquareLoader className="rounded-md" />
							</div>
							<div className="h-4 w-40">
								<SquareLoader className="rounded-md" />
							</div>
						</div>
					</div>
					<div className="w-20 h-8">
						<SquareLoader className="rounded-2xl" />
					</div>
				</div>

				<div className="relative flex flex-col">
					<p className={`font-roboto font-normal text-sm h-20 `}>
						<SquareLoader />
					</p>
				</div>
			</div>
		</WhiteShadowedContiainer>
	);
}
