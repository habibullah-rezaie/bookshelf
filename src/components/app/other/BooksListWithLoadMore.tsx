import React from "react";
import { BasicBookInfo } from "src/types/types";
import { getBookDetailLink } from "src/utils/book";
import { Button } from "../../lib/Buttons/Buttons";
import HorizontalBookCard from "../BookCards/HorizontalBookCard";
import HorizontalBookLoader from "../BookCards/HorizontalBookLoader";

function BooksListWithLoadMore({
	books,
	isFetchingNextPage,
	hasNextPage,
	fetchNextPage,
	isLoading,
}: {
	books: BasicBookInfo[];
	isFetchingNextPage: boolean;
	hasNextPage: boolean | undefined;
	fetchNextPage: () => void;
	isLoading: boolean;
}) {
	return (
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
				books.length === 0 && (
					<div className="w-full flex items-center justify-center">
						No bestsellers found :(
					</div>
				)
			)}
		</ul>
	);
}

export default BooksListWithLoadMore;
