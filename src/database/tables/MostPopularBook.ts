// TODO: Check if this matches db
export type MostPopularBook = {
	title: string;
	author: string;
	imageURL: string;
	isbn: string;
};

export type PopularBookPeriod = "YEAR" | "MONTH" | "WEEK";

const TABLE_NAME = "MostPopularBook";
