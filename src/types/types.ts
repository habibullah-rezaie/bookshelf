export type Book = {
	id: string;
	volumeInfo: {
		title: string;
		authors: string[];
		publisher: string;
		publishedDate: string;
		description: string;
		industryIdentifiers: { type: string; identifier: string }[];
		pageCount: number;
		categories: string[];
		//TODO: thereis a maincategory some times
		averageRating: number;
		ratingCount: number;
		imageLinks: {
			smallThumbnail: string;
			thumbnail: string;
		};
		language: string;
		previewLink: string;
		infoLink: string;
		accessInfo: {
			country: string;
			viewability: string; //TODO: Partial or other stuff update this
			epub: {
				isAvailable: boolean;
				acsTokenLink: string;
			};
			pdf: {
				isAvailable: boolean;
				acsTokenLink: string;
			};
		};
		webReaderLink: string;
		accessViewAllowed: string; //TODO: update this, this is an enum
	};
};

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
