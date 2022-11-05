import { InfiniteData } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import { Button } from "src/components/lib/Buttons/Buttons";
import ScrollDirection from "src/components/lib/Icons/ScrollDirection";
import ListSortByBar from "src/components/lib/Lists/ListSortByBar";
import Spinner from "src/components/lib/Spinner";
import { BasicBookInfo } from "src/types/types";
import HorizontalBookCard from "../BookCards/HorizontalBookCard";
import "src/components/app/HomePage/BestsellerBooksList/BestsellersBooksList.css";

function SearchResultsSection({
	onSortChange,
	selectedSorting,
	data,
	hasNextPage,
	fetchNextPage,
	isFetchingNextPage,
}: {
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
	const [scrollBarClassName, setScrollBarClassName] = React.useState<
		"no-scrollbar" | "thin-scrollbar"
	>("no-scrollbar");
	const allRows = data.pages.flatMap((pg) => pg.items);
	const parentRef = React.useRef<HTMLDivElement>(null);
	const listRef = React.useRef<HTMLUListElement>(null);

	console.log("hasNextPage", hasNextPage);
	const virtualizer = useVirtualizer({
		count: hasNextPage ? allRows.length + 1 : allRows.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 128,
		paddingEnd: 16,
		overscan: 5,
	});

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

			console.log(
				listRef.current.scrollHeight,
				listRef.current.scrollTop,
				listRef.current.getBoundingClientRect()
			);

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
									key={book?.id || "loaderRow"}
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
										<HorizontalBookCard book={book} />
									) : isFetchingNextPage ? (
										<div className="w-full flex justify-center items-center text-baseBlack">
											<Spinner title="Loading more books" className="w-8 h-8" />
										</div>
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

			<Button
				variant="plain"
				className="fixed bottom-28 right-10 w-10 h-10 z-10 flex items-center justify-center rounded-[100%] bg-baseBlack text-white"
				title="Scroll to Search"
				onClick={() => {
					// scroll to the first element
					parentRef.current?.scroll({
						top: 0,
						behavior: "smooth",
					});
				}}
			>
				<ScrollDirection direction="UP" className="w-8 h-8" />
			</Button>
		</div>
	);
}

export default SearchResultsSection;
