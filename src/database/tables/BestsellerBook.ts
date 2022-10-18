import supabase from "../db";

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

export async function select(
	query?: string,
	options?: {
		head?: boolean | undefined;
		count?:
			| "exact"
			| "planned"
			| "estimated"
			| "exact"
			| "planned"
			| "estimated"
			| null
			| undefined;
	}
): Promise<BestsellerBook[]> {
	if (!supabase) {
		return Promise.reject("Something went wrong connecting to server.");
	}

	const finalQuery = query ? query : "*";
	const {
		data: bestsellers,
		error,
		status,
	} = await supabase?.from("BestsellerBook").select(finalQuery);

	if (error) {
		return Promise.reject(error);
	}

	const responseIsOk = status >= 200 && status < 300;
	if (!responseIsOk) {
		return Promise.reject("Non 200 response code");
	}

	return Promise.resolve(bestsellers);
}
