function Notes({ className = "" }) {
	return (
		<svg
			viewBox="0 0 25 25"
			xmlns="http://www.w3.org/2000/svg"
			className={`${className}`}
		>
			<path
				d="M4.5 6.5C4.5 4.29086 6.29086 2.5 8.5 2.5H12.5H14.5633C15.1568 2.5 15.7197 2.76365 16.0997 3.21963L20.0364 7.94373C20.336 8.30316 20.5 8.75623 20.5 9.2241V12.5V18.5C20.5 20.7091 18.7091 22.5 16.5 22.5H8.5C6.29086 22.5 4.5 20.7091 4.5 18.5V6.5Z"
				stroke="#565454"
				stroke-width="1.5"
			/>
			<path
				d="M15.5 3V6.5C15.5 7.60457 16.3954 8.5 17.5 8.5H20"
				stroke="#565454"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
			<path
				d="M8.5 12.5H16.5"
				stroke="#565454"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
			<path
				d="M8.5 17.5H12.5"
				stroke="#565454"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
		</svg>
	);
}

export default Notes;
