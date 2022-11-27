import { FormEvent } from "react";
import { FaSearch, FaSpinner, FaTimes } from "react-icons/fa";
import Filter from "src/screens/Filter";
import { Button } from "./Buttons/Buttons";
import { Input } from "./Forms";

function SearchBoxWithFilter({
	handleSubmit,
	isError,
	isLoading,
	isQueried,
	query,
	onChange,
	openModal,
	inputLabel,
	inputPlaceHolder,
}: {
	handleSubmit: (ev?: FormEvent<HTMLFormElement>) => void;
	isError: boolean;
	isLoading: boolean;
	isQueried: boolean;
	query: string;
	onChange: (value: string) => void;
	openModal: () => void;
	inputLabel?: string;
	inputPlaceHolder?: string;
}) {
	return (
		<form
			className="w-full h-10 flex flex-row items-center justify-center space-x-2"
			onSubmit={handleSubmit}
		>
			<div
				className={`w-fit h-9 flex flex-row rounded-3xl focus-within:outline focus-within:outline-offset-2 focus-within:outline-baseBlack focus-within:outline-1 bg-white outline outline-1 outline-offset-2 outline-baseBlackBorder ${
					isError
						? `focus-within:ring-red-600 ring-red-600`
						: `focus-within:ring-baseBlack ring-baseBlack`
				} max-w-full transition-all duration-75`}
			>
				<div className="w-64 flex flex-row rounded-3xl">
					<label htmlFor="searchInput" className="sr-only">
						{inputLabel ?? "search box"}
					</label>

					<Button
						variant="plain"
						type="submit"
						className="w-fit px-1.5 text-center text-darkGray transition-all duration-150 bg-white rounded-l-2xl"
					>
						{/* TODO: disable button */}
						{isLoading && isQueried ? (
							<FaSpinner className="animate-spin" />
						) : isError ? (
							<FaTimes className="text-red-500" />
						) : (
							<FaSearch className="" />
						)}
					</Button>

					<Input
						role="searchbox"
						id="searchInput"
						className="flex-1"
						placeholder={inputPlaceHolder ?? "Search"}
						value={query}
						onChange={(ev) => onChange(ev.target.value)}
					/>
				</div>

				<Button
					className="flex flex-row space-x-1 justify-center items-center w-[5.8rem] h-9 col-end-12 px-3.5 bg-baseBlack text-white transition-all duration-150 rounded-3xl focus:outline-baseBlack focus:outline-1"
					variant="plain"
					type="button"
					onClick={openModal}
				>
					<div className="">
						<Filter />
					</div>
					<span>Filter</span>
				</Button>
			</div>
		</form>
	);
}

export default SearchBoxWithFilter;
