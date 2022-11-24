import React from "react";

export function useDontShowAgain() {
	const [isOpen, setIsOpen] = React.useState(() => {
		return localStorage.getItem("no-welcome") ? false : true;
	});

	const [noWelcome, setNoWelcome] = React.useState(() =>
		localStorage.getItem("no-welcome") ? true : false
	);

	React.useEffect(() => {
		if (noWelcome) localStorage.setItem("no-welcome", "true");
		else localStorage.removeItem("no-welcome");
	}, [noWelcome]);

	return { isOpen, setIsOpen, setNoWelcome, noWelcome };
}
