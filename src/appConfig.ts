import { PopularBookPeriod } from "./database/tables/MostPopularBook";

type ConfigType = {
	DEFAULT_POPULAR_BOOKS_PERIOD: PopularBookPeriod;
	DEFAULT_POPULAR_BOOKS_LIMIT: number;
	DEFAULT_BESTSELLER_BOOKS_LIMIT: number;
	DEFUALT_BOOK_IMG: string;
};

const config: ConfigType = Object.freeze({
	DEFAULT_POPULAR_BOOKS_PERIOD: "WEEK",
	DEFAULT_POPULAR_BOOKS_LIMIT: 10,
	DEFAULT_BESTSELLER_BOOKS_LIMIT: 10,
	DEFUALT_BOOK_IMG: "book.jpeg",
});

export default config;
