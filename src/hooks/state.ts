import React from "react";

export function useFirstRender() {
	const [firstRender, setFirstRender] = React.useState<boolean>(true);

	React.useEffect(() => {
		setFirstRender(false);
	}, []);

	return firstRender;
}
