import { BaseComponentStatuses, Book, BriefBook } from "src/types/types";
import DetailedBookCard, {
	ColBriefBookCard,
	RowBriefBookCard,
} from "./BookCard";
import SerachBookLoader from "./SearchBookLoader";

function DetailedBooksList({
	books,
	status,
	className = "",
}: {
	books: Book[];
	status: BaseComponentStatuses;
	className?: string;
}) {
	return (
		<ul className="mt-2 flex flex-col justify-center space-y-3">
			{status === "PENDING" && <SerachBookLoader />}
			{status === "RESOLVED" && (
				<>
					{books?.length && books?.length > 0
						? books.map((book, i) => {
								return (
									<li key={book.id}>
										<DetailedBookCard book={book} />
									</li>
								);
						  })
						: "Opps! nothing found :("}
				</>
			)}
			{status === "IDLE" && (
				<div>
					<a href="#searchForBooks">Search results appear here!</a>
				</div>
			)}
		</ul>
	);
}

export function BriefBooksList({
	books,
	className = "",
	direction = "col",
}: {
	books: BriefBook[];
	direction?: "row" | "col";
	className?: string;
}) {
	return direction === "col" ? (
		<BriefVerticalBookList books={books} className={className} />
	) : (
		<BriefHorizontalBookList books={books} className={className} />
	);
}

export function BriefHorizontalBookList({
	books,
	className = "",
}: {
	books: BriefBook[];
	className?: string;
}) {
	return (
		<ul className={`bestseller-list h-[21.75rem] px-7 ${className}`}>
			<>
				{books.length > 0
					? books.map((book) => {
							return (
								<li className={`inline-block`} key={`${book.bookImage}`}>
									<RowBriefBookCard book={book} />
								</li>
							);
					  })
					: `We're all caught up now.`}
			</>
		</ul>
	);
}

export function BriefVerticalBookList({
	books,
	className = "",
}: {
	books: BriefBook[];
	className?: string;
}) {
	return (
		<ul className={`flex flex-col ${className}`}>
			<>
				{books.length > 0
					? books.map((book) => {
							return (
								<li className={``} key={`${book.bookImage}`}>
									<ColBriefBookCard book={book} />
								</li>
							);
					  })
					: `We're all caught up now.`}
			</>
		</ul>
	);
}

export default DetailedBooksList;
