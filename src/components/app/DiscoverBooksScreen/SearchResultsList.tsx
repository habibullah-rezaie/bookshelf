import { InfiniteData } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import React from "react";
import ListSortByBar from "src/components/lib/Lists/ListSortByBar";
import Spinner from "src/components/lib/Spinner";
import { BasicBookInfo } from "src/types/types";
import HorizontalBookCard from "../BookCards/HorizontalBookCard";

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
					1.8 * window.innerHeight &&
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
				style={{
					height: `${window.innerHeight - 268}px`,
					width: "100%",
					overflowY: "scroll",
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
					{virtualizer.getVirtualItems().map((row) => {
						console.log(row, allRows.length);
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
									"We are all caught up!"
								)}
							</li>
						);
					})}
				</ul>
			</div>

		</div>
	);
}

export default SearchResultsSection;
