import { BestsellerBook } from "@prisma/client";
import { BriefBook, BestsellerType } from "types/types";
import axios from "axios";
import db from "../../database/db";

export async function checkForBestsellerUpdates() {
  const bestsellerBook = await db.bestsellerBook.findFirst({
    select: { createdAt: true },
  });

  // When to update
  // 1. no bestsellers at all
  const today = new Date();

  if (!bestsellerBook) {
    return true;
  } else {
    const todayWeekDay = today.getDay();
    const todayIsWednesday = todayWeekDay === 3;
    const bestsellersIsNotUpdatedToday =
      today.toDateString().split("T")[0] ===
      bestsellerBook?.createdAt.toDateString().split("T")[0];

    // if today is wednesday
    // 2. it is a weds day and bestsellers aren't updated.
    if (todayIsWednesday && bestsellersIsNotUpdatedToday) {
      return true;
    } else {
      // Get the last wednesday 00:30:00 in milliseconds from 1970
      let lastWednesdayTime: number = 0;
      const todayStartDay = new Date();
      todayStartDay.setUTCHours(0);
      todayStartDay.setUTCMinutes(30);
      todayStartDay.setUTCSeconds(0);

      if (todayWeekDay > 3) {
        lastWednesdayTime =
          todayStartDay.getTime() - 86400 * 1000 * (todayWeekDay - 3);
      } else {
        lastWednesdayTime =
          todayStartDay.getTime() - 86400 * 1000 * (7 - (3 - todayWeekDay));
      }

      // 2. In case not updated until last wednesday
      if (bestsellerBook.createdAt.getTime() < lastWednesdayTime) {
        return true;
      }
    }
  }
  return false;
}

export async function triggerUpdate() {
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

export function fetchBestSellers(type: BestsellerType) {
  const NYTimesAPIKey = process.env.REACT_APP_NYTIMES_API_KEY;
  const bestsellerKind =
    type === "FICTION"
      ? "combined-print-and-e-book-fiction"
      : "combined-print-and-e-book-nonfiction";

  const fetchURL = `https://api.nytimes.com/svc/books/v3/lists/current/${bestsellerKind}.json?api-key=${NYTimesAPIKey}`;

  return axios
    .get(fetchURL)
    .then(
      (resp) => {
        if (resp.status === 200) {
          return resp.data;
        }
        throw new Error(resp.statusText);
      },
      (error) => {
        throw error;
      }
    )
    .then((data: { status: string; results: { books: BriefBook[] } }) => {
      if (data.status === "OK") {
        return data.results.books;
      } else {
        throw new Error(data.status);
      }
    });
}
