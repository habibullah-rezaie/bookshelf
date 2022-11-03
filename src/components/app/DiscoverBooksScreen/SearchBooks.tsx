import { Button } from "src/components/lib/Buttons/Buttons";
import { Form, Input } from "src/components/lib/Forms";
import { Stack } from "src/components/lib/Layout";
import React, { FormEvent, useEffect, useState } from "react";
import { FaFilter, FaSearch, FaSpinner } from "react-icons/fa";
import { BaseComponentStatuses } from "src/types/types";
import { isDeepStrictEqual } from "src/utils/utils";

function useSearchWithFilters({
	setResolved,
	setRejected,
	setPending,
}: {
	setResolved(result: SearchResult): void;
	setRejected: (error: any) => void;
	setPending: () => void;
}) {
	const [query, setQuery] = useState("");
	const [filters, setFilters] = React.useState<SearchFilters>({});
	const [filtersSubmitted, setFiltersSubmitted] = React.useState(false);

	const search = React.useCallback(
		function search() {
			setPending();
			searchBook(query, filters).then(
				(result) => {
					setResolved(result);
				},
				(error) => {
					setRejected(error);
				}
			);
		},
		[filters, query, setPending, setRejected, setResolved]
	);

	const filtersRef = React.useRef(filters);
	useEffect(() => {
		if (filtersSubmitted && !isDeepStrictEqual(filtersRef.current, filters)) {
			filtersRef.current = filters;
			search();
			console.log("searched");
		}
	}, [filters, filtersSubmitted, search]);

	return {
		search,
		query,
		setQuery,
		filters,
		setFilters,
		setFiltersSubmitted,
	};
}

function SearchBooks({
	status,
	setResolved,
	setPending,
	setRejected,
}: {
	status: BaseComponentStatuses;
	setResolved(result: SearchResult): void;
	setRejected: (error: any) => void;
	setPending: () => void;
}) {
	const [filterModalOpen, setFilterModalOpen] = React.useState(false);
	const { search, query, setQuery, setFilters, setFiltersSubmitted } =
		useSearchWithFilters({
			setRejected,
			setResolved,
			setPending,
		});

	function closeFiltersModal() {
		setFilterModalOpen(false);
	}

	function handleSubmit(ev: FormEvent<HTMLFormElement>) {
		ev.preventDefault();

		search();
	}
	return (
		<>
			<Form className="" onSubmit={handleSubmit}>
				<Stack
					direction="horizontal"
					className="rounded-md ring-1 ring-opacity-40 ring-logoBlue focus-within:ring-2 focus-within:ring-opacity-20  focus-within:ring-logoBlue focus-within:border-[1px] focus-within:border-logoBlue max-w-full"
				>
					<label htmlFor="searchInput" className="sr-only">
						search for books
					</label>
					<Button
						variant="plain"
						type="button"
						className="px-1.5 bg-transparent rounded-sm rounded-l-none hover:bg transition-all duration-150 text-logoDarkGray hover:text-gray-700 active:text-gray-700"
						onClick={() => setFilterModalOpen(true)}
					>
						<FaFilter className="" />
					</Button>

					<Input
						role="searchbox"
						id="searchInput"
						className="w-48"
						value={query}
						onChange={(ev) => setQuery(ev.target.value)}
						autoFocus
					/>
					<Button
						variant="plain"
						type="submit"
						className="px-1.5 bg-logoBlue rounded-sm rounded-l-none hover:bg transition-all duration-150"
					>
						{/* TODO: disable button */}
						{/* TODO: turn red on error */}
						{status === "PENDING" ? (
							<FaSpinner className="animate-spin" />
						) : (
							<FaSearch className="text-white" />
						)}
					</Button>
				</Stack>
			</Form>
		</>



	);
}

export default SearchBooks;
