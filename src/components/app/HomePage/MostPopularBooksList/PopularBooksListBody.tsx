import { Resource } from "src/api/resource";
import { MostPopularBook } from "src/database/tables/MostPopularBook";
import PopularBookCard from "./PopularBookCard";
interface Props {
	popularBookResource: Resource<MostPopularBook[]>;
}
function PopularBooksListBody({ popularBookResource }: Props) {
	const books = popularBookResource.read();
	return (
		<>
			<ul className={`flex flex-col space-y-6`}>
				<>
					{books.length > 0
						? books.map((book) => {
								return (
									<li className={``} key={book.id}>
										<PopularBookCard book={book} />
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
