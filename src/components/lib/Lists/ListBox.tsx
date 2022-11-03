import { Listbox } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import { HiChevronUpDown } from "react-icons/hi2";
import ListHeading from "src/components/app/HomePage/ListHeader";
import { PopularBookPeriod } from "src/database/tables/MostPopularBook";
import { isOptionalTypeNode } from "typescript";

type OptionType = {
	value: any;
	displayValue: string;
};
// TODO: Change Name
function ListBox({
	selectedOption,
	onChange,
	allOptions,
	Heading,
	className = "",
}: {
	onChange: (option: typeof selectedOption.value) => void;
	selectedOption: OptionType;
	allOptions: OptionType[];
	Heading: React.ReactNode;
	className?: string;
}) {
	return (
		<div
			className={`relative flex w-full justify-between items-center text-[#453C3C] text-xs ml-1 ${className}`}
		>
			<ListHeading className="text-base">{Heading}</ListHeading>
			<Listbox value={selectedOption.value} onChange={onChange}>
				<Listbox.Button
					className={`flex flex-row items-center focus:outline-none rounded-md px-1 py-1`}
				>
					<div>{selectedOption.displayValue}</div>
					<HiChevronUpDown
						className="h-5 w-5 text-gray-400"
						aria-hidden="true"
					/>
				</Listbox.Button>
				<Listbox.Options
					className={`absolute z-10 top-full left-[50%] translate-x-[-50%] w-30 h-fit focus:outline-none rounded-md border-[1px] border-baseBlack overflow-hidden`}
				>
					{allOptions.map((option) => (
						<ListBoxOption
							displayValue={option.displayValue}
							value={option.value}
							key={option.value}
						/>
					))}
				</Listbox.Options>
			</Listbox>
		</div>
	);
}

export default ListBox;

function ListBoxOption({
	value,
	displayValue,
	className = "",
}: {
	value: PopularBookPeriod;
	displayValue: string;
	className?: string;
}) {
	return (
		<Listbox.Option
			value={value}
			className={`focus:outline-none w-25 bg-white ${className}`}
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
					<div>{displayValue}</div>
				</div>
			)}
		</Listbox.Option>
	);
}
