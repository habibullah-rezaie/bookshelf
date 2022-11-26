import React from "react";

function CartIcon({ className = "" }) {
	return (
		<svg
			viewBox="0 0 25 25"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
		>
			<path
				d="M2.5 3.5L3.54936 3.70987C4.41136 3.88227 5.05973 4.59732 5.1472 5.47203L5.3 7M5.3 7L6.2886 15.2383C6.40922 16.2435 7.26195 17 8.27435 17H17.2673C18.8733 17 20.2733 15.907 20.6628 14.3489L21.7855 9.85783C22.1485 8.40619 21.0505 7 19.5542 7H5.3Z"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
			<path
				d="M13.5 14H9.5"
				stroke="#565454"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<circle cx="9" cy="20.5" r="1.5" fill="currentColor" />
			<circle cx="18" cy="20.5" r="1.5" fill="currentColor" />
		</svg>
	);
}

export default CartIcon;
