import { Listbox } from "@headlessui/react";
import { FaCheck } from "react-icons/fa";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import Spinner from "src/components/lib/Spinner";
import { ReadingStatus } from "src/database/tables/UserBook";

const statusTexts = {
	WANT_TO: "Want to Read",
	READING: "Reading",
	READ: "Read",
	REMOVE: "Remove from Shelves",
};

export type ReadingStatusBoxOptions = ReadingStatus | "REMOVE";
export function ReadingStatusBox({
	selectedOption,
	onChange,
	className = "",
	openingDirection = "down",
	mode = "create",
	isLoading,
}: {
	onChange: (option: ReadingStatusBoxOptions) => void;
	selectedOption: ReadingStatusBoxOptions;
	className?: string;
	openingDirection?: "down" | "up";
	isLoading: boolean;
	mode: "create" | "update" | "delete";
}) {
	return (
		<div className={`relative flex  items-center text-xs ${className}`}>
			<Listbox value={selectedOption} onChange={onChange} disabled={isLoading}>
				{({ open }) => {
					return (
						<>
							<Listbox.Button
								className={`flex flex-row items-center justify-between flex-1 focus:outline-none rounded-md px-2.5`}
							>
								<div>
									{!isLoading ? (
										selectedOption === "REMOVE" ? (
											statusTexts.WANT_TO
										) : (
											statusTexts[selectedOption]
										)
									) : (
										<Spinner className="w-5 h-5" />
									)}
								</div>
								{open ? (
									<HiChevronDown
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								) : (
									<HiChevronUp
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								)}
							</Listbox.Button>

							<Listbox.Options
								className={`absolute z-10 ${
									openingDirection === "down" ? `top-full` : "bottom-0"
								} left-[50%] translate-x-[-50%] w-[9rem] h-fit focus:outline-none rounded-md border-[1px] border-baseBlack overflow-hidden`}
							>
								{mode === "update" ? (
									<ListBoxOption
										displayValue={"Remove from Shelves"}
										value={"REMOVE"}
										showSelected={false}
									/>
								) : null}
								<ListBoxOption
									displayValue={"Want to Read"}
									value={"WANT_TO"}
									showSelected={mode === "update"}
								/>
								<ListBoxOption
									displayValue={"Reading"}
									value={"READING"}
									showSelected={mode === "update"}
								/>
								<ListBoxOption
									displayValue={"Read"}
									value={"READ"}
									showSelected={mode === "update"}
								/>
							</Listbox.Options>
						</>
					);
				}}
			</Listbox>
		</div>
	);
}

function ListBoxOption({
	value,
	displayValue,
	className = "",
	showSelected = true,
}: {
	value: ReadingStatusBoxOptions;
	displayValue: string;
	className?: string;
	showSelected?: boolean;
}) {
	return (
		<Listbox.Option
			value={value}
			className={`focus:outline-none w-25 bg-baseBlack ${className}`}
		>
			{({ active, selected }) => (
				<div
					className={`flex flex-row px-2 py-1 text-white text-xs text-left font-normal font-poppins w-[120%] ${
						active ? "bg-blue-500 bg-opacity-80" : "bg-baseBlack"
					}`}
				>
					{showSelected && (
						<div className="w-5 text-center">
							{selected && (
								<FaCheck
									className={`w-3 ${active ? "text-white" : "text-blue-500"}`}
								/>
							)}
						</div>
					)}
					<div className="">{displayValue}</div>
				</div>
			)}
		</Listbox.Option>
	);
}
