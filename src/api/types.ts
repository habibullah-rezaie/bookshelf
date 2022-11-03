export type GoogleBookImageLinks = {
	smallThumbnail?: string;
	thumbnail?: string;
	small?: string;
	medium?: string;
};

export type GoogleBookIdentifiers = {
	type: "ISBN_13" | "ISBN_10" | "ISSN" | "OTHER";
	identifier: string;
}[];

export type GoogleBook = {
	id: string;
	volumeInfo: {
		title: string;
		authors: string[];
		publisher: string;
		publishedDate: string;
		description: string;
		industryIdentifiers: GoogleBookIdentifiers;
		pageCount: number;
		categories: string[];
		mainCategory?: string;
		averageRating: number;
		ratingCount: number;
		imageLinks: GoogleBookImageLinks;
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

