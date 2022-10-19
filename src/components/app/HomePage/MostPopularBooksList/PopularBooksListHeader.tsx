import { Listbox } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import { PopularBookPeriod } from "src/database/tables/MostPopularBook";

interface ListProps {
	onPeriodChange: (period: PopularBookPeriod) => void;
	period: PopularBookPeriod;
}
function PopularBookPeriodsListBox({ onPeriodChange, period }: ListProps) {
	return (
		<Listbox value={period} onChange={onPeriodChange}>
			<Listbox.Button>{getOptionText(period)}</Listbox.Button>
			<Listbox.Options>
				<PopularBookPeriodOption period={"YEAR"} />
				<PopularBookPeriodOption period={"MONTH"} />
				<PopularBookPeriodOption period={"WEEK"} />
			</Listbox.Options>
		</Listbox>
	);
}
function PopularBookPeriodOption({ period }: { period: PopularBookPeriod }) {
	return (
		<Listbox.Option value={period}>
			{({ active, selected }) => (
				<div
					className={`${
						active ? "bg-blue-500 text-white" : "bg-white text-black"
					}`}
				>
					{selected && <FaCheck />}
					{getOptionText(period)}
				</div>
			)}
		</Listbox.Option>
	);
}

function getOptionText(period: PopularBookPeriod) {
	switch (period) {
		case "MONTH":
			return "This month";
		case "WEEK":
			return "This week";
		case "YEAR":
			return "Last 12 months";
	}
}
