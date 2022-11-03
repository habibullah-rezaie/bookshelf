import React from "react";
import { FaSpinner } from "react-icons/fa";
import { SearchFilters } from "src/types/DiscoverBooksScreenTypes";

const FiltersModal = React.lazy(
	() =>
		import(
			/* webpackPrefetch: true */ "src/components/app/DiscoverBooksScreen/FiltersModal"
		)
);

type FilterBoxProps = {
	filterModalOpen: boolean;
	closeFiltersModal: () => void;
	setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
	setFiltersSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};
function FilterModalLander({
	filterModalOpen,
	closeFiltersModal,
	setFilters,
	setFiltersSubmitted,
}: FilterBoxProps) {
	return (
		<div>
			<React.Suspense
				fallback={
					<FaSpinner
						className="animate-spin fixed bottom-0 right-0 text-sm"
						title="still laoding"
					/>
				}
			>
				<FiltersModal
					isOpen={filterModalOpen}
					onClose={closeFiltersModal}
					setFilters={setFilters}
					setFiltersSubmitted={setFiltersSubmitted}
				/>
			</React.Suspense>
		</div>
	);
}

export default FilterModalLander;
