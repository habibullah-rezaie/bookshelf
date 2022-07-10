import { fetchBestSellers } from "src/client/fetchers";
import { createResource } from "src/client/resource";
import BestsellersBooksList from "src/components/app/HomePage/BestsellersBooksList";
import Header from "src/components/lib/Header";
import { Stack } from "src/components/lib/Layout";
import Logo from "src/components/logo";
import React from "react";
import { BestsellerBook } from "@prisma/client";

function HomeScreen() {
  const bestsellersResource = createResource<BestsellerBook[]>(
    fetchBestSellers()
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
