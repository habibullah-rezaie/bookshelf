import React from "react";
import { createResource } from "src/api/resource";
import BestsellersBooksList from "src/components/app/HomePage/BestsellersBooksList";
import Header from "src/components/lib/Header";
import { Stack } from "src/components/lib/Layout";
import Logo from "src/components/logo";
import {
	BestsellerBook,
	select as selectBestsellers,
} from "src/database/tables/BestsellerBook";

function HomeScreen() {
	const bestsellersResource = createResource<BestsellerBook[]>(
		selectBestsellers()
	);

	return (
		<div className="w-full h-full relative px-2 text-sm">
			<Header
				Logo={<Logo className="max-h-8 md:max-h-12" />}
				userName="Habibullah"
				userProfileIMG="profile.jpg"
			/>
			<Stack direction="vertical">
				<BestsellersBooksList
					bestsellerType="FICTION"
					resource={bestsellersResource}
				/>
				<BestsellersBooksList
					bestsellerType="NON_FICTION"
					resource={bestsellersResource}
				/>
			</Stack>
		</div>
	);
}

export default HomeScreen;
