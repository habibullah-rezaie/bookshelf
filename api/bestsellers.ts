import { BestsellerBook } from "@prisma/client";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchBestSellers } from "./_util/bestsellers";
import { BriefBook } from "types/types";
import db from "../database/db";
import { checkForBestsellerUpdates } from "./_util/bestsellers";

export default async function handler(
  req: VercelRequest,
  resp: VercelResponse
) {
  console.log("1. Checking for updates");
  // Check if update needed
  let updateNeeded: boolean;
  try {
    updateNeeded = await checkForBestsellerUpdates();
  } catch (e) {
    console.log(e);
    return resp.status(500).send("Something went wrong!");
  }

  console.log("Update needed:", updateNeeded);
  if (updateNeeded) {
    try {
      console.log("Updating...");
      await triggerUpdate();
    } catch (e) {
      console.log(e);
      resp.status(500).send("Something went wrong!");
    }
  }

  // Finally, no matter what response with a list of bestsellers
  responsedWithListofBestsellers(resp);
}

async function triggerUpdate() {
  const fictionBestsellers = await fetchBestSellers("FICTION");
  const nonFictionBestsellers = await fetchBestSellers("NON_FICTION");

  await db.bestsellerBook.deleteMany({});

  await db.bestsellerBook.createMany({
    data: [
      // Add fiction bestsellers
      ...fictionBestsellers.map(
        ({
          title,
          author,
          book_image,
          primary_isbn10,
          primary_isbn13,
        }: BriefBook): Omit<
          BestsellerBook,
          "id" | "createdAt" | "updatedAt"
        > => ({
          author,
          bookImage: book_image,
          primaryISBN10: primary_isbn10,
          primaryISBN13: primary_isbn13,
          title,
          type: "FICTION",
        })
      ),

      // Add non-fiction bestsellers
      ...nonFictionBestsellers.map(
        ({
          title,
          author,
          book_image,
          primary_isbn10,
          primary_isbn13,
        }: BriefBook): Omit<
          BestsellerBook,
          "id" | "createdAt" | "updatedAt"
        > => ({
          author,
          bookImage: book_image,
          primaryISBN10: primary_isbn10,
          primaryISBN13: primary_isbn13,
          title,
          type: "NON_FICTION",
        })
      ),
    ],
  });
}

async function responsedWithListofBestsellers(resp: VercelResponse) {
  return resp.status(200).json(await db.bestsellerBook.findMany());
}
