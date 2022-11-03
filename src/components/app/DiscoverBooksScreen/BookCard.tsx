import * as React from "react";
import { FaHeart, FaMinus, FaRegHeart } from "react-icons/fa";
import { VscBookmark } from "react-icons/vsc";
import appConfig from "src/appConfig";
import { Button } from "src/components/lib/Buttons/Buttons";
import Rating from "src/components/lib/Rating";
import { Book, BriefBook } from "src/types/types";
import { getAuthorsSummary } from "src/utils/book";
import { trimTextWithElepsis } from "src/utils/utils";


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
