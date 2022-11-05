import { useQuery } from "@tanstack/react-query";
import React from "react";
import SearchResultsSection from "src/components/app/DiscoverBooksScreen/SearchResultsList";
import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";
import { BasicBookInfo } from "src/types/types";
import { useSearchQueryBuilder } from "../queries/searchBooks";
import {
	GoogleBookIdentifiers,
	GoogleBookImageLinks,
	SearchResult,
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

	return { ...data, totalItems: undefined };
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
}
