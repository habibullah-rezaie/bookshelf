import React from "react";
import { Resource } from "src/api/resource";
import SectionWithLoaderAndErrorBoundary from "src/components/lib/Section";
import {
	BestsellerBook,
	BestsellerType,
} from "src/database/tables/BestsellerBook";
import { BriefBooksList } from "../DiscoverBooksScreen/BooksList";

function BestsellersBooksList({
	bestsellerType,
	resource,
}: {
	bestsellerType: BestsellerType;
	resource: Resource<BestsellerBook[]>;
}) {
	const listHeader =
		bestsellerType === "FICTION"
			? "Fiction Bestsellers"
			: "Non-Fiction Bestsellers";

	return (
		// TODO: add a fallback here
		<SectionWithLoaderAndErrorBoundary heading={<h3>{listHeader}</h3>}>
			<div>
				<BestsellersListBody
					resource={resource}
					bestsellerType={bestsellerType}
				/>
			</div>
		</SectionWithLoaderAndErrorBoundary>
	);
}

export default BestsellersBooksList;
function BestsellersListBody({
	resource,
	bestsellerType,
}: {
	resource: Resource<BestsellerBook[]>;
	bestsellerType: BestsellerType;
}) {
	const books = resource.read();
	return (
		<BriefBooksList
			books={books
				.filter((book) => book.type === bestsellerType)
				.map(({ author, primaryISBN10, primaryISBN13, title, bookImage }) => ({
					author,
					bookImage,
					primaryISBN10,
					primaryISBN13,
					title,
				}))}
		/>
	);
}
