import { GoogleBook } from "../types";

async function getGoogleBookDetail(id: string): Promise<GoogleBook> {
	if (!id) {
		throw new Error("Something went wrong; We are working on it");
	}
	// Add InfoLink and AccessInfo properties later
	const finalURL = `${process.env.REACT_APP_BOOK_API}/volumes/${id}?fields=id,volumeInfo(title,authors,publisher,description,pageCount,categories,language,publishedDate,industryIdentifiers,imageLinks,mainCategory,averageRating,ratingsCount)`;

	try {
		const response = await fetch(finalURL);
		if (response.ok) {
			return response.json();
		} else {
			const errorResponse = await response.json();
			if (errorResponse.error) {
				throw errorResponse.error;
			} else {
				throw errorResponse;
			}
		}
	} catch (err) {
		if (process.env.NODE_ENV !== "development") {
			console.log(err);
		}

		throw err;
	}
}

export default getGoogleBookDetail;
