import { BestsellerType } from "src/database/tables/BestsellerBook";
import { PopularBookPeriod } from "src/database/tables/MostPopularBook";

const keys = {
	books: ["books"] as const,

	bestsellers: () => [...keys.books, "bestsellers"] as const,
	bestsellersOfType: (kind: BestsellerType) =>
		[...keys.books, "bestsellers", kind] as const,
	// bestsellerOfTypeCount: (kind: BestsellerType) =>
	// 	[...keys.bestsellersOfType(kind), "MAX_COUNT"] as const,

	popular: () => [...keys.books, "popular books"] as const,
	popularOfPeriod: (period: PopularBookPeriod) =>
		[...keys.books, "popular books", period] as const,

};

export default keys;