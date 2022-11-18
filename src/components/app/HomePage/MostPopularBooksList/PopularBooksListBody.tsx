import { useMostPopularBooks } from "src/api/hooks/mostPopular";
import {
	MostPopularBook,
	PopularBookPeriod,
} from "src/database/tables/MostPopularBook";
import { createStateFromHomePopularBook } from "src/utils/book";
import HorizontalBookCard from "../../BookCards/HorizontalBookCard";
interface Props {
	period: PopularBookPeriod;
}
function PopularBooksListBody({ period }: Props) {
	let { data, isError, error, isLoading, isSuccess } =
		useMostPopularBooks(period);

	if (isError) throw error;

	if (isLoading) return <div>Loading</div>;

	if (!isSuccess) throw new Error("Fetching popular books failed :(");

	const books = data?.data ?? [];
	return (
		<>
			<ul className={`flex flex-col space-y-6`}>
				<>
					{books.length > 0
						? books.map((book) => {
								return (
									<li className={``} key={book.bookId}>
										{/* Configure the place of scroll */}
										<HorizontalBookCard
											book={book}
											link={{
												to: "/book/" + book.bookId,
												state: createStateFromHomePopularBook(
													period,
													book.bookId
												),
											}}
										/>
									</li>
								);
						  })
						: `We're all caught up now.`}
				</>
			</ul>
		</>
	);
}

export default PopularBooksListBody;
