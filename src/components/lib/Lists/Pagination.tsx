// TODO: talk about styling
function Pagination({
	hasNextPage,
	page,
	pageSize,
	totalItems,
	onNextPage,
	onPreviousPage,
}: {
	hasNextPage: boolean;
	onNextPage: () => void;
	onPreviousPage: () => void;
	page: number;
	pageSize: number;
	totalItems: number;
}) {
	const firstIndex = (page - 1) * pageSize + 1;
	return (
		<div className="px-5 py-5 bg-white border-t flex flex-row xs:flex-row items-center justify-between          ">
			<span className="text-xs xs:text-sm text-gray-900">
				Showing {firstIndex} to {firstIndex + pageSize - 1}
				{totalItems && totalItems > 0 && ` of ${totalItems} results`}
			</span>
			<div className="inline-flex mt-2 xs:mt-0">
				<button
					className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l"
					disabled={page <= 1}
					onClick={onPreviousPage}
				>
					Prev
				</button>
				<button
					className="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r"
					disabled={!hasNextPage}
					onClick={onNextPage}
				>
					Next
				</button>
			</div>
		</div>
	);
}

export default Pagination;
