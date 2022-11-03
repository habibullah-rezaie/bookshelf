export type BookLanguage = { English: string; alpha2: string };
export type SearchFilters = {
	title?: string;
	author?: string;
	publisher?: string;
	downloadable?: boolean;
	isbn?: string;
	sortBy?: "relevance" | "newest";
	language?: string;
	category?: string;
};

export type setFilters = React.Dispatch<React.SetStateAction<SearchFilters>>;
