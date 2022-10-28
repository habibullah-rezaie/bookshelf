import * as React from "react";
import { FaHeart, FaMinus, FaRegHeart } from "react-icons/fa";
import { VscBookmark } from "react-icons/vsc";
import appConfig from "src/appConfig";
import { Button } from "src/components/lib/Buttons/Buttons";
import Rating from "src/components/lib/Rating";
import { Book, BriefBook } from "src/types/types";
import { getAuthorsSummary } from "src/utils/book";
import { trimTextWithElepsis } from "src/utils/utils";

function DetailedBookCard({ book }: { book: Book }) {
	const [isFavorite, setIsFavorite] = React.useState(false);
	const [readingStatus, setReadingStatus] = React.useState<
		"READING" | "HAVE_READ" | "none"
	>("none");

	const toggleIsFavorite = () =>
		setIsFavorite((prevIsFavorite) => !prevIsFavorite);

	const title = book.volumeInfo.title;
	const img =
		book.volumeInfo.imageLinks?.smallThumbnail ||
		book.volumeInfo.imageLinks?.thumbnail ||
		"book.jpeg";

	//  Get book properties
	const author = getAuthorsSummary(book.volumeInfo.authors);
	const rating = book.volumeInfo.averageRating;
	const pageCount = book.volumeInfo.pageCount;
	const publishedYear =
		book.volumeInfo.publishedDate?.split("-")[0] || "Not sure when";
	const description = book.volumeInfo.description || "No description.";
	return (
		<section className="relative max-w-full text-xxs md:text-base pr-2 pb-4 rounded-md flex flex-col overflow-hidden shadow-sm hover:shadow-md border-[1px] outline-none focus:outline-none  text-black">
			<div className="w-full flex flex-col justify-center items-center">
				<div className="w-20 ">
					<img src={img} alt={`${title}'s cover`} className="w-full" />
				</div>
				<div className="flex flex-col space-y-1 items-center text-center">
					<h3 className="text-sm text-indigo  w-[80%]" title={title}>
						{trimTextWithElepsis(title, 35)}
					</h3>
					<p className="text-indigoLighten80 text-[.6rem]">{author}</p>
					<div className="flex justify-center">
						<Rating
							id={book.id}
							rating={rating}
							setRating={(rating: number) => console.log("rated ", rating)}
						/>
					</div>
				</div>
			</div>
			<div className="px-1">
				<div className="flex justify-center my-3">
					<div className="flex flex-col px-3 border-r-[1px] border-indigoLighten80">
						<p>{pageCount}</p> <p className="text-indigoLighten80">Pages</p>
					</div>
					<div
						className={`${
							rating > 0 && `border-r-[1px]`
						} flex flex-col px-3  border-indigoLighten80`}
					>
						<p>{publishedYear}</p>{" "}
						<p className="text-indigoLighten80">Release</p>
					</div>
					{rating > 0 && (
						<div className="flex flex-col px-3 ">
							<p>{rating}</p> <p className="text-indigoLighten80">Star</p>
						</div>
					)}
				</div>
				<p className="relative h-10 mb-5 overflow-y-hidden after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gray-50 after:bg-opacity-50">
					{description}
				</p>
				<div className="absolute left-0 z-10 bg-transparent w-full bottom-1 py-4 grid gap-3 justify-center grid-flow-col ">
					{readingStatus === "none" ? (
						<Button onClick={() => setReadingStatus("READING")}>
							Start Reading
						</Button>
					) : readingStatus === "HAVE_READ" ? (
						<Button
							className="text-logoOrange font-bold"
							onClick={() => setReadingStatus("READING")}
						>
							Unread Book
						</Button>
					) : (
						<Button
							className="bg-green-400 hover:bg-green-500 text-black"
							onClick={() => setReadingStatus("HAVE_READ")}
						>
							Finish Book
						</Button>
					)}

					<div className="flex bg-logoGray rounded-lg px-3 py-1 text-lg hover:ring-indigoLighten80 hover:ring-4 hover:ring-opacity-50">
						{readingStatus !== "none" && (
							<Button
								variant="plain"
								title="Remove from Reading"
								className="p-1 hover:brightness-150"
								onClick={() => setReadingStatus("none")}
							>
								<FaMinus className="text-logoOrange" />
							</Button>
						)}
						<Button
							variant="plain"
							title={!isFavorite ? "Add to favorites" : "Remove from favorites"}
							className={`p-1 hover:brightness-150`}
							onClick={toggleIsFavorite}
						>
							{isFavorite ? (
								<FaHeart className="text-logoOrange " />
							) : (
								<FaRegHeart className="text-logoOrange" />
							)}
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default DetailedBookCard;

type BriefCardProps<T> = React.PropsWithChildren<{
	book: BriefBook & T;
	className?: string;
}>;

// TODO: Add colors to tailwind config
export function RowBriefBookCard<T>({
	book: { bookImage, title, authors },
	children,
	className = "",
}: BriefCardProps<T>) {
	const titleText = trimTextWithElepsis(title, 15);
	const authorFullText = getAuthorsSummary(authors);
	const authorText = trimTextWithElepsis(
		authorFullText.replace(" and ", " & "),
		20
	);
	return (
		// Fill the whole height of 20rem and give a 13.68rem room to the image
		// This 13.68rem height is chosen by the average height of pictures of bestsellers
		<section
			className={`w-36 h-[calc(100% - 1px)] font-poppins flex flex-col rounded-md drop-shadow-lg shadow-md border-[1px] border-t-none ${className}`}
		>
			<div className="h-[13.68rem] overflow-y-hidden">
				<img
					className="rounded-md w-full h-auto"
					src={bookImage || "book.jpeg"}
					alt={`${title}'s cover`}
				/>
			</div>
			<div className="px-2 pt-4 pb-2 rounded-md">
				<div className="space-y-1">
					<h1
						className="text-xs text-[#453C3C] font-semibold"
						// Did it to avoid String not assinable to string
						title={`${titleText} || "Unknown Name"`}
					>
						{titleText}
					</h1>
					<div
						className="text-xxs text-[#565454] text-opacity-80 font-medium"
						title={authorFullText}
					>
						{authorText}
					</div>
					{children}
				</div>
			</div>
		</section>
	);
}

export function ColBriefBookCard<T>({
	book: { bookImage, title, authors },
}: BriefCardProps<T>) {
	const authorFullText = getAuthorsSummary(authors);
	const authorText = trimTextWithElepsis(
		authorFullText.replace(" and ", " & "),
		20
	);
	return (
		<section className="w-full h-28 max-h-28 font-poppins flex flex-row justify-between rounded-md border-[1px] border-x-0 drop-shadow-sm">
			<div className="h-full w-max">
				<img
					className="rounded-md h-28 w-auto"
					src={bookImage || appConfig.DEFUALT_BOOK_IMG}
					alt={`${title}'s cover`}
				/>
			</div>
			<div className="flex-1 pt-4 pl-6 pr-4 rounded-md rounded-l-none">
				<div className="space-y-2">
					<h1 className="text-sm  font-semibold" title={title}>
						{trimTextWithElepsis(title, 30)}
					</h1>
					<div
						className="text-xs text-[#565454] text-opacity-80 font-medium"
						title={authorFullText}
					>
						{authorText}
					</div>
				</div>
			</div>

			{/* Bookmark button */}
			<div className="ml-4 my-auto text-[#565454]">
				<VscBookmark className="w-5 h-10" title="Add to favorite books" />
			</div>
		</section>
	);
}
