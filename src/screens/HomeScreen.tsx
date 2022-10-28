import { createResource } from "src/api/resource";
import appConfig from "src/appConfig";
import BestsellersBooksList from "src/components/app/HomePage/BestsellerBooksList/BestsellersBooksList";
import MostPopularBooksList from "src/components/app/HomePage/MostPopularBooksList/MostPopularBooksList";
import {
	BestsellerBook,
	selectAndFilterBestsellerBooks,
} from "src/database/tables/BestsellerBook";
import {
	MostPopularBook,
	PopularBookPeriod,
	selectAndFilterPopularBooks,
} from "src/database/tables/MostPopularBook";

const DEFUALT_PERIOD: PopularBookPeriod = "WEEK";
function HomeScreen() {
	const fictionBestsellersResource = createResource<BestsellerBook[]>(
		selectAndFilterBestsellerBooks("", (filterBuilder) => {
			return filterBuilder
				.eq("type", "FICTION")
				.order("rank")
				.limit(appConfig.DEFAULT_BESTSELLER_BOOKS_LIMIT);
		})
	);

	const nonFictionBestsellersResource = createResource<BestsellerBook[]>(
		selectAndFilterBestsellerBooks("", (filterBuilder) => {
			return filterBuilder
				.eq("type", "NON_FICTION")
				.order("rank")
				.limit(appConfig.DEFAULT_BESTSELLER_BOOKS_LIMIT);
		})
	);
	const popularBooksResource = createResource<MostPopularBook[]>(
		selectAndFilterPopularBooks("", (filterBuilder) => {
			return filterBuilder
				.eq("period", appConfig.DEFAULT_POPULAR_BOOKS_PERIOD)
				.order("rank")
				.limit(appConfig.DEFAULT_POPULAR_BOOKS_LIMIT);
		})
	);

	return (
		<>
			<BestsellersBooksList
				bestsellerType="FICTION"
				resource={fictionBestsellersResource}
			/>
			<BestsellersBooksList
				bestsellerType="NON_FICTION"
				resource={nonFictionBestsellersResource}
			/>
			<div className="w-screen px-7 mt-8">
				<MostPopularBooksList
					popularBooksResource={popularBooksResource}
					period={DEFUALT_PERIOD}
				/>
			</div>
		</>
	);
}

export default HomeScreen;
