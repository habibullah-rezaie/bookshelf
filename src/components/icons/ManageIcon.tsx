import React from "react";

function ManageIcon({ className = "" }) {
	return (
		<svg
			viewBox="0 0 25 25"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
		>
			<path
				d="M5.5 7.5C5.5 5.29086 7.29086 3.5 9.5 3.5H15.5C17.7091 3.5 19.5 5.29086 19.5 7.5V20.6683C19.5 21.4595 18.6248 21.9373 17.9592 21.5095L13.5815 18.6953C12.9227 18.2717 12.0773 18.2717 11.4185 18.6953L7.04076 21.5095C6.37525 21.9373 5.5 21.4595 5.5 20.6683V7.5Z"
				stroke="#565454"
				stroke-width="1.5"
			/>
			<path
				d="M9.5 9H15.5"
				stroke="#565454"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}

export default ManageIcon;
