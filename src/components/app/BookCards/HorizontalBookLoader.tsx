import React from "react";
import SquareLoader from "src/components/lib/Loaders/SquareLoader";

function HorizontalBookLoader() {
	return (
		<div
			className={`w-full h-28 max-h-28 flex flex-row justify-between rounded-md border-[1px] border-x-0 drop-shadow-sm`}
		>
			<div className={`h-full w-[4.6rem]`}>
				<SquareLoader />
			</div>

			<div className="flex flex-col space-y-3 flex-1 pt-4 pl-6 pr-4 rounded-md rounded-l-none">
				<div className="h-4 w-[80%] rounded-lg overflow-hidden">
					<SquareLoader />
				</div>
				<div className="h-3 w-[65%] rounded-lg overflow-hidden">
					<SquareLoader />
				</div>
				<div className="h-2 w-[50%] rounded-lg overflow-hidden">
					<SquareLoader />
				</div>
			</div>

			<div className="h-6 w-6 ml-4 my-auto rounded-md overflow-hidden">
				<SquareLoader />
			</div>
		</div>
	);
}

export default HorizontalBookLoader;
