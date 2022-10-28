export function getAuthorsSummary(authors: string[] = []) {
	switch (authors.length) {
		case 0:
			return "Unkown Author";
		case 1:
			return authors[0];
		case 2:
			return `${authors[0]} & ${authors[1]}`;
		default:
			return `${authors[0]} & ${authors.length - 1} others`;
	}
}
