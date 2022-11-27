import ListBox from "src/components/lib/Lists/ListBox";

type SortByRankOrNewest = "newest" | "rank";
function SortByNewestOrRank({
	onChange,
	selectedSorting,
}: {
	onChange: (sortBy: SortByRankOrNewest) => void;
	selectedSorting: SortByRankOrNewest;
}) {
	const options = {
		newest: "Sort by Newest",
		rank: "Sort by Rank",
	};

	return (
		<div className="text-xs mb-1">
			<ListBox<SortByRankOrNewest>
				allOptions={Object.entries(options).map((entry) => ({
					value: entry[0] as SortByRankOrNewest,
					displayValue: entry[1],
				}))}
				onChange={onChange}
				selectedOption={{
					value: selectedSorting,
					displayValue: options[selectedSorting],
				}}
				optionsPosition="right-aligned"
			/>
		</div>
	);
}

export default SortByNewestOrRank;
