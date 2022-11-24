import { GoogleBookImageLinks } from "src/api/types";
import { BestsellerType } from "src/database/tables/BestsellerBook";
import { PopularBookPeriod } from "src/database/tables/MostPopularBook";
import { StateFromHome } from "./list";

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

export function chooseBetterImageSize(imageLinks: GoogleBookImageLinks) {
	if (!imageLinks) return "";
	// FIX: TODO: For resolutions better than small an api key is required
	// Find a way to get arround of exposing our api key
	// if (imageLinks?.medium) return imageLinks.medium;
	// if (imageLinks?.small) return imageLinks.small;
	if (imageLinks?.thumbnail) return imageLinks.thumbnail;
	else if (imageLinks?.smallThumbnail) return imageLinks.smallThumbnail;
	else return "";
}

export function getBookDetailLink(bookId: string) {
	return "/book/" + bookId;
}

export function createStateFromHomePopularBook(
	period: PopularBookPeriod,
	bookId: string
): StateFromHome {
	return {
		from: "/",
		exactPosition: {
			popularPeriod: period,
			bookId,
		},
	};
}

export function createStateFromHomeBestseller(
	bestsellerType: BestsellerType,
	bookId: string
): StateFromHome {
	return {
		from: "/",
		exactPosition: {
			bestsellerType,
			bookId,
		},
	};
}

export const formatRatingDate = (ratingDate: string) =>
	new Date(ratingDate).toLocaleDateString("en-US", {
		dateStyle: "medium",
	});
