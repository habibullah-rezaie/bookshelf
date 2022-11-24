import React, { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchBookInfiniteLoading } from "src/api/hooks/searchBooks";
import { useBookReviewSearch } from "src/api/hooks/userReview";
import { ReviewFilters } from "src/screens/ReviewSearchBox";
import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";
import { generateSearchParams } from "src/utils/list";

export function useSearchBookByParam() {
	const [queryEnabled, setQueryEnabled] = React.useState(false);
	const [parseError, setParseError] = React.useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const { search, ...queryingObj } = useSearchBookInfiniteLoading(
		10,
		queryEnabled
	);

	React.useEffect(() => {
		try {
			const query = searchParams.get("q");
			const filters = searchParams.get("filters");
			if (!query && !filters) {
				return;
			}
			const decodedQuery = decodeURIComponent(query || "");
			const decodedFilters = JSON.parse(decodeURIComponent(filters || "{}"));

			console.log(decodedFilters);

			if (!queryEnabled) {
				console.log("notqueried", filters, query);
				setQueryEnabled(true);
			}

			console.log("decoded", decodedQuery, decodedFilters);
			search(decodedQuery, decodedFilters);
		} catch (err) {
			if (process.env.NODE_ENV !== "production") {
				console.log(err);
			}
			setParseError("Something Unexpected Happened");
		}
	}, [searchParams, search, queryEnabled]);

	const onSearch = useCallback(
		(query = "", filters: SearchFilters) => {
			let param = generateSearchParams(query, filters);

			setSearchParams(param);
		},
		[setSearchParams]
	);

	return {
		search: onSearch,
		queryingObj,
		queryEnabled,
		setQueryEnabled,
		parseError,
	};
}

export function useSearchReviewByParam(bookId: string) {
	const [queryEnabled, setQueryEnabled] = React.useState(false);
	const [parseError, setParseError] = React.useState("");
	const [searchParams, setSearchParams] = useSearchParams();
	const { search, queryObj, ...rest } = useBookReviewSearch(bookId);

	React.useEffect(() => {
		try {
			const query = searchParams.get("q");
			const filters = searchParams.get("filters");
			if (!query && !filters) {
				return;
			}

			const decodedQuery = decodeURIComponent(query || "");
			const decodedFilters = JSON.parse(decodeURIComponent(filters || "{}"));

			console.log("decodedFilters", decodedFilters);

			if (!queryEnabled) {
				console.log("notqueried", filters, query);
				setQueryEnabled(true);
			}

			console.log("decoded", decodedQuery, decodedFilters);
			search(decodedQuery, decodedFilters);
		} catch (err) {
			if (process.env.NODE_ENV !== "production") {
				console.log(err);
			}
			setParseError("Something Unexpected Happened");
		}
	}, [searchParams, search, queryEnabled]);

	const onSearch = useCallback(
		(query: string, filters: ReviewFilters) => {
			let param = generateSearchParams(query, filters);

			setSearchParams(param);
		},
		[setSearchParams]
	);

	return {
		search: onSearch,
		queryEnabled,
		setQueryEnabled,
		parseError,
		queryObj,
		...rest,
	};
}
