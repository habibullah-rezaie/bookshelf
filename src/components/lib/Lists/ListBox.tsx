import { Listbox } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import { HiChevronUpDown } from "react-icons/hi2";

export type OptionType<T> = {
	value: T;
	displayValue: string;
};
// TODO: Change Name
function ListBox<T>({
	selectedOption,
	onChange,
	allOptions,
	className = "",
	openingDirection = "down",
	CustomButton,
	optionsPosition = "middle",
}: {
	onChange: (option: typeof selectedOption.value) => void;
	selectedOption: OptionType<T>;
	allOptions: OptionType<T>[];
	className?: string;
	CustomButton?: React.ReactNode;
	openingDirection?: "down" | "up";
	optionsPosition?: "left-aligned" | "middle" | "right-aligned";
}) {
	return (
		<div
			className={`relative flex  items-center text-[#453C3C] text-xs ml-1 ${className}`}
		>
			<Listbox value={selectedOption.value} onChange={onChange}>
				<Listbox.Button
					className={`flex flex-row items-center focus:outline-none rounded-md px-1 py-1`}
				>
					{CustomButton ? (
						<>{CustomButton}</>
					) : (
						<>
							<div>{selectedOption.displayValue}</div>
							<HiChevronUpDown
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</>
					)}
				</Listbox.Button>
				<Listbox.Options
					className={`absolute z-10 ${
						openingDirection === "down" ? `top-full` : "bottom-full"
					} ${
						optionsPosition === "middle"
							? "left-[50%] translate-x-[-50%]"
							: optionsPosition === "left-aligned"
							? "left-0 translate-x-0"
							: "right-0 translate-x-0"
					} w-max h-fit focus:outline-none rounded-md border-[1px] border-baseBlack overflow-hidden`}
				>
					{allOptions.map((option) => (
						<ListBoxOption
							displayValue={option.displayValue}
							value={option.value}
							key={JSON.stringify(option.value)}
						/>
					))}
				</Listbox.Options>
			</Listbox>
		</div>
	);
}

export default ListBox;

function ListBoxOption<T>({
	value,
	displayValue,
	className = "",
}: {
	value: T;
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
