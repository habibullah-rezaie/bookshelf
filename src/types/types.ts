export type BaseComponentStatuses =
	| "PENDING"
	| "IDLE"
	| "RESOLVED"
	| "REJECTED";

export type BriefBook = {
	bookImage: string | null;
	title: string;
	authors: string[];
	primaryISBN13: string;
};

export type BasicBookInfo = {
	id: string;
	title: string;
	authors: string[];
	bookImage: string;
	primaryISBN13: string;
	averageRating: number;
	publishedDate: string;
};
