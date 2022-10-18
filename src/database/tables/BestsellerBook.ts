
export type BestsellerBook = {
	id: string;
	title: string;
	author: string | null;
	bookImage: string | null;
	createdAt: string;
	updatedAt: string;
	primaryISBN10: string;
	primaryISBN13: string;
	type: BestsellerType;
};

export type BestsellerType = "FICTION" | "NON_FICTION";
