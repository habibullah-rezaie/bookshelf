import pluralize from "pluralize";
import React from "react";
import { useUserBooks } from "src/api/hooks/userBook";
import { ShortBestseller } from "src/api/queries/bestsellers";
import { ShortPopularBook } from "src/api/queries/mostPopular";
import { GoogleBook } from "src/api/types";
import appConfig from "src/appConfig";
import { WhiteShadowedContiainer } from "src/components/lib/Header/Container";
import ImgWithLoader from "src/components/lib/Img/ImgWithLoader";
import SquareLoader from "src/components/lib/Loaders/SquareLoader";
import { BestsellerBook } from "src/database/tables/BestsellerBook";
import {
	MostPopularBook,
	PopularBookPeriod,
} from "src/database/tables/MostPopularBook";
import { UserBook } from "src/database/tables/UserBook";
import { BasicBookInfo } from "src/types/types";
import { chooseBetterImageSize } from "src/utils/book";
import BookCategories from "../BookDetailsScreen/BookCategories";
import DescriptionSection from "../BookDetailsScreen/DescriptionSection";
import { getCardDateText } from "../HomePage/MostPopularBooksList/popularBookHelper";
import RatingPublishedDateRow from "./RatingPublishedDateRow";

function DetailedBookCard({
	isLoading,
	book,
	cachedBook,
	bestsellerBadge,
	popularBadge,
}: {
	bestsellerBadge?: ShortBestseller;
	popularBadge?: [ShortPopularBook, PopularBookPeriod];
	book?: GoogleBook;
	isLoading: boolean;
	cachedBook?: BasicBookInfo | MostPopularBook | BestsellerBook;
}) {
	const title = book ? book.volumeInfo.title : cachedBook?.title;
	const authors = book ? book.volumeInfo.authors : cachedBook?.authors;

	const bookImage =
		(book
			? chooseBetterImageSize(book.volumeInfo.imageLinks)
			: cachedBook?.bookImage) || appConfig.DEFUALT_BOOK_IMG;

	// We well show the cached Image as a loader for
	// The new Image
	const cachedBookImage = React.useMemo(
		() => (
			<ImgWithLoader
				className="rounded-md mb-4"
				src={cachedBook?.bookImage || appConfig.DEFUALT_BOOK_IMG}
				style={{ height: "100%", maxWidth: "100%" }}
				height={"20.635rem"}
				aspectWidth={4}
				aspectHeight={5}
				alt={title ? `Cover of ${title}` : "Book Cover"}
				Loader={<SquareLoader className="rounded-md" />}
			/>
		),
		[cachedBook?.bookImage, title]
	);

	const publishedDate = book
		? book.volumeInfo.publishedDate
		: cachedBook && "publishedDate" in cachedBook
		? cachedBook.publishedDate
		: undefined;

	const averageRating = book
		? book.volumeInfo.averageRating
		: cachedBook && "averageRating" in cachedBook
		? cachedBook.averageRating
		: undefined;

	const ratingCount = book ? book.volumeInfo.ratingCount : undefined;

	const description = book ? book.volumeInfo.description : undefined;

	if (book == null && cachedBook == null && !isLoading) {
		return <div>Something weird happend and we're working on it :)</div>;
	}

	return (
		<section className="w-full h-fit flex flex-col">
			<>
				<WhiteShadowedContiainer className="relative">
					{cachedBook ? (
						cachedBookImage
					) : (
						<BookImage
							title={title}
							bookImage={bookImage}
							Loader={
								cachedBook ? (
									cachedBookImage
								) : (
									<SquareLoader className="rounded-md" />
								)
							}
						/>
					)}
					{bestsellerBadge || popularBadge ? (
						<div className="absolute top-[20%] left-0 flex flex-col space-y-1 bg-transparent">
							{bestsellerBadge && (
								<div className="h-8 px-2 flex flex-row space-x-1 justify-center items-center text-base text-white font-poppins bg-[#FFC41F] bg-opacity-90 shadow-lg">
									<span className="font-bold ">
										{pluralize(
											"week",
											bestsellerBadge.weeksOnList,
											true
										).toUpperCase()}
									</span>
									<span className="text-opacity-80  font-normal ">
										{" "}
										Best Seller
									</span>
								</div>
							)}

							{popularBadge && (
								<div className="h-8 px-2 flex flex-row space-x-1 justify-center items-center text-base text-white font-poppins bg-[#FFC41F] bg-opacity-90 shadow-lg">
									<span className="font-bold ">
										#{popularBadge[0].rank}{" "}
										{popularBadge[1] === "MONTH"
											? "Monthly"
											: popularBadge[1] === "WEEK"
											? "Weekly"
											: "Annual"}
									</span>
									<span className="text-opacity-80  font-normal ">
										{" "}
										Popular
									</span>
								</div>
							)}
						</div>
					) : null}
				</WhiteShadowedContiainer>

				<div className="mt-6">
					<DetailedBookCardDetails
						title={title}
						authors={authors || []}
						publishedDate={publishedDate}
						averageRating={averageRating}
						ratingCount={ratingCount}
						// Change this
						isLoading={isLoading}
					/>
				</div>
				{description && description.length > 0 ? (
					<DescriptionSection description={description} />
				) : !description && isLoading ? (
					<div className="w-full h-min overflow-hidden mt-8">
						<div className="h-5 w-36 rounded-md overflow-hidden">
							<SquareLoader />
						</div>
						<div className="h-24 w-70 rounded-md overflow-hidden mt-2">
							<SquareLoader />
						</div>
					</div>
				) : null}

				{/* Get the user rating in here */}
				{book?.id && <div></div>}
				{book?.volumeInfo.categories instanceof Array ? (
					<BookCategories categories={book?.volumeInfo.categories} />
				) : null}
			</>
		</section>
	);
}

export default DetailedBookCard;

function DetailedBookCardDetails({
	title,
	authors,
	publishedDate,
	averageRating,
	ratingCount,
	isLoading,
}: {
	title?: string;
	authors?: string[];
	publishedDate?: string;
	ratingCount?: number;
	averageRating?: number;
	isLoading: boolean;
}) {
	const listFormat = new Intl.ListFormat(undefined, {
		style: "short",
		type: "conjunction",
	});
	const authorFullText = listFormat.format(authors || []);
	const numFormater = Intl.NumberFormat();
	const ratingCountStr = ratingCount && numFormater.format(ratingCount);
	const dateString = getCardDateText(publishedDate || "");

	return (
		<div className="flex flex-col text-baseBlack font-poppins">
			{title ? (
				<h1 className="font-semibold text-2xl mb-2" aria-label="Book's Title">
					{title}
				</h1>
			) : !title && isLoading ? (
				<div className="h-8 w-20 mb-2">
					<SquareLoader className="rounded-md " />
				</div>
			) : null}

			{authorFullText ? (
				<p className="text-sm opacity-80" aria-label="Authors">
					{authorFullText}
				</p>
			) : !authorFullText && isLoading ? (
				<div className="h-5 w-20">
					<SquareLoader className="rounded-md " />
				</div>
			) : null}

			{dateString && (
				<div className="text-baseBlack text-opacity-80 text-sm font-poppins mt-2">
					Published {dateString}
				</div>
			)}

			{/* In this section will go rating and published Date */}
			{!isLoading && <RatingPublishedDateRow averageRating={averageRating} />}

			{ratingCount != null && ratingCount > 0 ? (
				<div className="text-xxs text-baseBlack text-opacity-80 font-poppins">
					{ratingCountStr}
				</div>
			) : null}
		</div>
	);
}

const BookImage = React.memo(function BookImage({
	bookImage,
	title,
	Loader: cachedBookImage,
}: {
	bookImage?: string;
	title?: string;
	Loader: React.ReactNode;
}) {
	return (
		<ImgWithLoader
			className=""
			src={bookImage || appConfig.DEFUALT_BOOK_IMG}
			style={{ height: "100%", maxWidth: "100%" }}
			height={"20.635rem"}
			aspectWidth={4}
			aspectHeight={5}
			alt={title ? `Cover of ${title}` : "Book Cover"}
			Loader={cachedBookImage}
		/>
	);
});

export function useUserBookOfId(
	bookId: string,
	userId: string,
	options?: Parameters<typeof useUserBooks>["1"]
) {
	const [userBook, setUserBook] = React.useState<UserBook | null>(null);

	const queryResult = useUserBooks(userId || "", options);

	React.useEffect(() => {
		if (queryResult.isLoading || queryResult.isError) return;

		if (!queryResult.data) return;

		console.log(queryResult.data, "USERBOOK");
		setUserBook(
			queryResult.data.data.find((book) => book.bookId === bookId) || null
		);
	}, [
		bookId,
		queryResult.data,
		queryResult.isError,
		queryResult.isLoading,

		// don't delete this
		queryResult.dataUpdatedAt,
	]);

	return {
		userBook,
		queryData: queryResult,
		resetUserBook: () => setUserBook(null),
	};
}
