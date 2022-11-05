import {
	InfiniteData,
	useInfiniteQuery,
	useQuery,
} from "@tanstack/react-query";
import React from "react";
import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";
import { BasicBookInfo } from "src/types/types";
import {
	infiniteLoadingSearchQueryBuilder,
	useSearchQueryBuilder,
} from "../queries/searchBooks";
import {
	GoogleBookIdentifiers,
	GoogleBookImageLinks,
	SearchResult,
	SearchResultBookSchema,
} from "../types";

export type SearchHandler = (query: string, filters: SearchFilters) => void;

export function useSearchBookBox(pageSize: number) {
	const [query, setQuery] = React.useState<string>("");
	const [filters, setFilters] = React.useState<SearchFilters>({});
	const [page, setPage] = React.useState<number>(1);

	const useQueryResult = useQuery({
		...useSearchQueryBuilder(query, filters, pageSize, page),
		select: changeSearchResultToUseableBook,
	});

	const search = React.useCallback((query: string, filters: SearchFilters) => {
		setFilters(filters);
		setQuery(query);
	}, []);

	return {
		...useQueryResult,
		query,
		filters,
		search,
		page,
		setPage,
		hasNextPage:
			useQueryResult && useQueryResult?.data?.totalItems
				? useQueryResult.data.totalItems / 10 > 1
				: false,
	};
}

function chooseBetterImageSize(imageLinks: GoogleBookImageLinks) {
	if (imageLinks?.medium) return imageLinks.medium;
	else if (imageLinks?.small) return imageLinks.small;
	else if (imageLinks?.thumbnail) return imageLinks.thumbnail;
	else if (imageLinks?.smallThumbnail) return imageLinks.smallThumbnail;
	else return "";
}

function findISBN13OfGoogleBook(identifiers: GoogleBookIdentifiers) {
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

function changeSearchResultToUseableBook(data: SearchResult) {
	let newBooks: BasicBookInfo[] = [];
	if (data.totalItems != null && data?.items instanceof Array) {
		for (const book of data.items) {
			newBooks.push(changeIncommingBooktoBasic(book));
		}
		return { totalItems: data.totalItems, items: newBooks };
	}

	return { items: newBooks, totalItems: NaN };
}

function changeIncommingBooktoBasic(
	book: SearchResultBookSchema
): BasicBookInfo {
	return {
		id: book.id,
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

export function useSearchBookInfiniteLoading(
	pageSize: number,
	enabled: boolean = true
) {
	const [query, setQuery] = React.useState<string>("");
	const [filters, setFilters] = React.useState<SearchFilters>({});

	const useQueryResult = useInfiniteQuery({
		enabled,
		retry: (count, _) => count <= 2,
		...infiniteLoadingSearchQueryBuilder(query, filters, pageSize),
		select: InfiniteSearchResultMapper,
	});

	const search = React.useCallback((query: string, filters: SearchFilters) => {
		setFilters(filters);
		setQuery(query);
	}, []);

	return {
		...useQueryResult,
		query,
		filters,
		search,
	};
}

function InfiniteSearchResultMapper(
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

		console.log("flatMapInside", data);
		console.log("AllRowsInside", allRows);
		new Set(
			data.pages.flatMap((pg) => {
				return pg.items != null ? pg.items.map((item) => item && item.id) : [];
			})
		).forEach((id) => {
			const item = allRows.find((el) => el[0].id === id);

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

		console.log(newData, "newData");
		return newData;
	}
	return { pages: [], pageParams: data.pageParams };
}
