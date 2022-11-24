import React from "react";

function Filter() {
	return (
		<svg
			width="25"
			height="24"
			viewBox="0 0 25 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M21.5 7L11.5 7"
				stroke="white"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<circle
				r="2"
				transform="matrix(-1 0 0 1 5.5 7)"
				stroke="white"
				stroke-width="1.5"
			/>
			<path
				d="M3.5 17L13.5 17"
				stroke="white"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<circle cx="19.5" cy="17" r="2" stroke="white" stroke-width="1.5" />
		</svg>
	);
}

export default Filter;
