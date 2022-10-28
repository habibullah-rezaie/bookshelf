import { select as selectFromTable, SelectOptions } from "../methods";
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

const TABLE_NAME = "BestsellerBook";
export async function select(
	query?: string,
	options?: SelectOptions
): Promise<BestsellerBook[]> {
	return selectFromTable<BestsellerBook>(TABLE_NAME, query || "", options);
}
