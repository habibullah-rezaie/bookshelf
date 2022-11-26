import { InfiniteData } from "@tanstack/react-query";
import {
	GoogleBookIdentifiers,
	SearchResult,
	SearchResultBookSchema,
} from "src/api/types";
import { BestsellerType } from "src/database/tables/BestsellerBook";
import { PopularBookPeriod } from "src/database/tables/MostPopularBook";
import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";
import { BasicBookInfo } from "src/types/types";
import { chooseBetterImageSize } from "./book";

export function getPagination(
	page: number,
	pageSize: number,
	size: number
): [number, number] {
	let resultsCount = page * pageSize;
	let start = resultsCount > size ? 0 : resultsCount;
	let end = resultsCount > size ? size : resultsCount;
	return [start, end];
}

export type StateFromSearch = {
	filters: SearchFilters;
	query: string;
	pageSize: number;
	from: "/search";
	index: number;
};

export function generateSearchParams<T>(query: string, filters: T) {
	const searchParams = new window.URLSearchParams();

	searchParams.set("q", encodeURIComponent(query));
	searchParams.set("filters", encodeURIComponent(JSON.stringify(filters)));

	return searchParams;
}

export function backToSearchUrl(state: StateFromSearch) {
	if (!state.from || state.from !== "/search") return null;
	const url = new URL(state.from, window.location.origin);

	for (const param of generateSearchParams<SearchFilters>(
		state.query,
		state.filters
	).entries()) {
		url.searchParams.set(param[0], param[1]);
	}

	url.searchParams.set("index", state.index.toString());
	return url;
}

export type StateFromHome = {
	from: "/";
	exactPosition?: {
		popularPeriod?: PopularBookPeriod;
		bestsellerType?: BestsellerType;
		bookId: string;
	};
};

export function backToHomeUrl(state: StateFromHome) {
	if (!state.from || state.from !== "/") return null;

	const url = new URL(state.from, window.location.origin);
	if (state.exactPosition) {
		url.searchParams.set(
			"exactPosition",
			encodeURIComponent(JSON.stringify(state.exactPosition))
		);
	}

	return url;
}

export function infiniteSearchResultMapper(
	data: InfiniteData<SearchResult>
): InfiniteData<{
	totalItems: number;
	items: BasicBookInfo[];
}> {
	if (data.pages.length > 0) {
		let newData: InfiniteData<{
			totalItems: number;
			items: BasicBookInfo[];
		}> = { pageParams: data.pageParams, pages: [] };

		const mapper = (
			item: SearchResultBookSchema,
			i: number
		): [SearchResultBookSchema, number] => {
			return [item, i];
		};

		const allRows: [SearchResultBookSchema, number][] = data.pages.flatMap(
			(pg, i) => (pg.items ? pg.items.map((item) => mapper(item, i)) : [])
		);

		new Set(
			data.pages.flatMap((pg) => {
				return pg.items != null ? pg.items.map((item) => item && item.id) : [];
			})
		).forEach((id) => {
			const item = allRows.find(
				(el) => el[0].id === id && el[0].volumeInfo.title
			);

			if (!item) {
				return;
			}

			const changedItem = changeIncommingBooktoBasic(item[0]);
			const pageIndex = item[1];
			let newPage = newData.pages[pageIndex] ?? null;
			if (!newPage) {
				newPage = {
					totalItems: data.pages[pageIndex].totalItems,
					items: [changedItem],
				};
				newData.pages[pageIndex] = newPage;
			} else {
				newPage.items.push(changedItem);
			}
		});

		return newData;
	}
	return { pages: [], pageParams: data.pageParams };
}

export function changeIncommingBooktoBasic(
	book: SearchResultBookSchema
): BasicBookInfo {
	return {
		bookId: book.id,
		authors: book.volumeInfo.authors || [],
		averageRating: book.volumeInfo.averageRating,
		bookImage: chooseBetterImageSize(book.volumeInfo.imageLinks),
		primaryISBN13: findISBN13OfGoogleBook(
			book.volumeInfo.industryIdentifiers || []
		),
		publishedDate: book.volumeInfo.publishedDate,
		title: book.volumeInfo.title,
	};
}

export function findISBN13OfGoogleBook(identifiers: GoogleBookIdentifiers) {
	if (identifiers?.length > 0) {
		const identifier = identifiers.find(
			(indentifier) => indentifier.type === "ISBN_13"
		);

		if (identifier) {
			return identifier.identifier;
		}
	}

	return "";
}
