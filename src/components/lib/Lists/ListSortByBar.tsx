import ListHeading from "src/components/app/HomePage/ListHeader";
import ListBox from "./ListBox";

function ListSortByBar({
	onSortChange,
	selectedSorting,
	Heading,
}: {
	onSortChange: (sortBy: "relevance" | "newest") => void;
	selectedSorting: string;
	Heading: React.ReactNode;
}) {
	return (
		<div className="flex flex-row justify-between items-center w-full text-xs">
			<ListHeading className="flex items-center">{Heading}</ListHeading>
			<ListBox
				allOptions={[
					{ value: "newest", displayValue: "Newest" },
					{ value: "relevance", displayValue: "Relevance" },
				]}
				onChange={onSortChange}
				selectedOption={{
					value: selectedSorting,
					displayValue:
						selectedSorting.slice(0, 1).toUpperCase() +
						selectedSorting.slice(1),
				}}
			/>
		</div>
	);
}

export default ListSortByBar;
