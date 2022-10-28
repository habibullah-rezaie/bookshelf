import { Listbox } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import { HiChevronUpDown } from "react-icons/hi2";
import { PopularBookPeriod } from "src/database/tables/MostPopularBook";

interface Props {
	onPeriodChange: (period: PopularBookPeriod) => void;
	period: PopularBookPeriod;
}

function PopularBookPeriodsListBox({ onPeriodChange, period }: Props) {
	return (
		<div className="relative flex justify-center text-[#453C3C] text-xs ml-1">
			<Listbox value={period} onChange={onPeriodChange}>
				<Listbox.Button
					className={`flex flex-row items-center focus:outline-none rounded-md px-1 py-1`}
				>
					<div>{getOptionText(period)}</div>
					<HiChevronUpDown
						className="h-5 w-5 text-gray-400"
						aria-hidden="true"
					/>
				</Listbox.Button>
				<Listbox.Options
					className={`absolute z-10 top-full left-[50%] translate-x-[-50%] w-40 h-fit focus:outline-none rounded-md border-[1px] border-baseBlack overflow-hidden`}
				>
					<PopularBookPeriodOption period={"YEAR"} />
					<PopularBookPeriodOption period={"MONTH"} />
					<PopularBookPeriodOption period={"WEEK"} />
				</Listbox.Options>
			</Listbox>
		</div>
	);
}

function PopularBookPeriodOption({ period }: { period: PopularBookPeriod }) {
	return (
		<Listbox.Option
			value={period}
			className={"focus:outline-none w-35 bg-white"}
		>
			{({ active, selected }) => (
				<div
					className={`flex flex-row px-2 py-1 text-[#453C3C] text-xs text-left font-normal font-poppins w-[120%] ${
						active ? "bg-blue-500 bg-opacity-80" : "bg-white"
					}`}
				>
					<div className="w-5 text-center">
						{selected && (
							<FaCheck
								className={`w-3 ${active ? "text-white" : "text-baseBlack"}`}
							/>
						)}
					</div>
					<div>{getOptionText(period)}</div>
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

export default PopularBookPeriodsListBox;
