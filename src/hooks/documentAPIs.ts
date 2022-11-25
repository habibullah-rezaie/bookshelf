import React from "react";

export function useDocumentTitle(title: string) {
	React.useEffect(() => {
		document.title = title;
	}, [title]);
}
