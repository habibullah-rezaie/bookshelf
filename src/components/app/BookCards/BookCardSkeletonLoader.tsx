import React from "react";

// TODO: Edit this loader
function BookCardSkeletonLoader() {
	return (
		<div className="animate-pulse w-full text-xxs md:text-base pr-2 pb-4 rounded-md flex flex-col overflow-hidden shadow-sm hover:shadow-md border-[1px] outline-none focus:outline-none  text-black">
			<div className="w-full flex flex-col justify-center items-center">
				<div className="w-20 h-20 bg-gray-200"></div>
				<div className="w-full flex items-center flex-col py-1 space-y-1">
					<div className="w-[65%] h-3 bg-gray-200 rounded-md"></div>
					<div className="w-[45%] h-3 bg-gray-200 rounded-md"></div>
					<div className="w-[50%] h-3 bg-gray-200 rounded-md"></div>
				</div>
			</div>
			<div className="flex flex-col items-center w-full px-1 space-y-1">
				<div className="w-[80%] h-4 bg-gray-200"></div>
				<div className="w-[80%] h-7 bg-gray-200"></div>
			</div>
		</div>
	);
}

export default BookCardSkeletonLoader;
