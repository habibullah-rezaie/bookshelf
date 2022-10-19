import { Resource } from "src/api/resource";
import { BriefBooksList } from "src/components/app/DiscoverBooksScreen/BooksList";
import { MostPopularBook } from "src/database/tables/MostPopularBook";
interface Props {
	popularBookResource: Resource<MostPopularBook[]>;
}
function PopularBooksListBody({ popularBookResource }: Props) {
	const books = popularBookResource.read();
	return (
		<BriefBooksList
			books={books.map(({ author, title, imageURL, isbn }) => ({
				title,
				author,
				bookImage: imageURL,
				primaryISBN10: isbn.length === 10 ? isbn : "",
				primaryISBN13: isbn.length === 13 ? isbn : "",
			}))}
		/>
	);
}

export default PopularBooksListBody;
