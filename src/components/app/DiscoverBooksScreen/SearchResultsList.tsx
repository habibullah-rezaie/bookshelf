import { InfiniteData } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import { useSearchParams } from "react-router-dom";
import "src/components/app/HomePage/BestsellerBooksList/BestsellersBooksList.css";
import ScrollToTop from "src/components/lib/Buttons/ScrollToTop";
import ListSortByBar from "src/components/lib/Lists/ListSortByBar";
import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";
import { BasicBookInfo } from "src/types/types";
import HorizontalBookCard from "../BookCards/HorizontalBookCard";
import HorizontalBookLoader from "../BookCards/HorizontalBookLoader";

function SearchResultsSection({
	onSortChange,
	selectedSorting,
	data,
	hasNextPage,
	fetchNextPage,
	isFetchingNextPage,
	query,
	filters,
}: {
	query: string;
	filters: SearchFilters;
	fetchNextPage: () => any;
	isFetchingNextPage: boolean;
	selectedSorting: "relevance" | "newest";
	onSortChange: (sortBy: "relevance" | "newest") => void;
	hasNextPage: boolean | undefined;
	data: InfiniteData<{
		totalItems: number;
		items: BasicBookInfo[];
	}>;
}) {
	const [usedIndex, setUsedIndex] = React.useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [scrollBarClassName, setScrollBarClassName] = React.useState<
		"no-scrollbar" | "thin-scrollbar"
	>("no-scrollbar");
	const allRows = data.pages.flatMap((pg) => pg.items);
	const parentRef = React.useRef<HTMLDivElement>(null);
	const listRef = React.useRef<HTMLUListElement>(null);

	const virtualizer = useVirtualizer({
		count: hasNextPage ? allRows.length + 1 : allRows.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 128,
		paddingEnd: 16,
		overscan: 5,
	});

	// Use for when user has come back from another page
	// and previously he/she was at the `location.state.index`
	React.useEffect(() => {
		if (!parentRef.current) return;
		const indexStr = Number(searchParams.get("index"));

		if (isNaN(indexStr)) return;
		if (!usedIndex) setUsedIndex(true);

		parentRef.current.scroll({ top: indexStr * 128 });
	}, [searchParams, usedIndex]);

	// For the first elements of list fetch more pages
	React.useEffect(() => {
		if (!listRef.current) return;

		if (!isFetchingNextPage && hasNextPage && data.pages.length < 3) {
			fetchNextPage();
		}
	}, [data.pages.length, fetchNextPage, hasNextPage, isFetchingNextPage]);

	React.useLayoutEffect(() => {
		const refCurrent = parentRef.current;
		const mouseInHandler = (_: any) => {
			if (listRef.current && listRef.current.children.length > 1)
				setScrollBarClassName("thin-scrollbar");
		};

		const mouseOutHandler = (_: any) => {
			setScrollBarClassName("no-scrollbar");
		};

		refCurrent?.addEventListener("mouseenter", mouseInHandler);
		refCurrent?.addEventListener("mouseleave", mouseOutHandler);

		return () => {
			refCurrent?.removeEventListener("mouseenter", mouseInHandler);
			refCurrent?.removeEventListener("mouseleave", mouseOutHandler);
		};
	}, []);

	// Fetch the next page if the user has scroll more than
	React.useEffect(() => {
		const handler = (_: any) => {
			if (!listRef.current) return;

			if (
				listRef.current.getBoundingClientRect().bottom <=
					1.5 * window.innerHeight &&
				hasNextPage &&
				!isFetchingNextPage
			) {
				fetchNextPage();
				console.log("gonna fetch more");
			}
		};

		const parentRefCurrent = parentRef.current;
		parentRefCurrent?.addEventListener("scroll", handler);
		return () => parentRefCurrent?.removeEventListener("scroll", handler);
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	return (
		<div className="flex flex-col space-y-2">
			<ListSortByBar
				Heading={<span className="text-sm font-semibold">Sort By: </span>}
				onSortChange={onSortChange}
				selectedSorting={selectedSorting}
			/>
			<div
				// On firefox this looks ok, no need to change from thin to none
				// on webkit, We need to set it to none if mouse exits or
				// to custom thin style if enters
				className={`${scrollBarClassName}`}
				style={{
					height: `${window.innerHeight - 268}px`,
					width: "100%",
					overflowY: "scroll",
					// thıs works om Fırefox
					scrollbarWidth: "thin",
				}}
				ref={parentRef}
			>
				<ul
					className={`flex flex-col`}
					style={{
						height: `${virtualizer.getTotalSize()}px`,
						width: "100%",
						position: "relative",
					}}
					ref={listRef}
				>
					{allRows.length > 0 &&
						virtualizer.getVirtualItems().map((row) => {
							const isLoaderRow = row.index >= allRows.length ? true : false;
							const book = allRows[row.index];

							return (
								<li
									key={book?.bookId || "loaderRow"}
									className={`${isLoaderRow && "loaderRow"}`}
									style={{
										position: "absolute",
										top: 0,
										left: 0,
										width: `100%`,
										height: `${row.size}px`,
										transform: `translateY(${row.start}px)`,
									}}
								>
									{!isLoaderRow ? (
										<HorizontalBookCard
											book={book}
											link={{
												to: "/book/" + book.bookId,
												state: {
													filters,
													query,
													pageSize: 10,
													from: "/search",
													index: row.index,
												},
												onClick: () => {
													const newSearchParams = new window.URLSearchParams(
														searchParams
													);
													newSearchParams.set("index", row.index.toString());
													setSearchParams(newSearchParams);
												},
											}}
										/>
									) : isFetchingNextPage ? (
										<HorizontalBookLoader />
									) : (
										<div className="w-full flex justify-center items-center text-baseBlack font-poppins">
											we are all caught up!
										</div>
									)}
								</li>
							);
						})}
					{allRows.length === 0 && (
						<div className="w-full flex items-center justify-center text-baseBlack font-poppins">
							No Results Found :(
						</div>
					)}
				</ul>
			</div>

			<ScrollToTop
				onClick={() => {
					parentRef.current &&
						parentRef.current.scroll({ top: 0, behavior: "smooth" });
				}}
			/>
		</div>
	);
}

export default SearchResultsSection;
