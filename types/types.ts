export type BestsellerType = "FICTION" | "NON_FICTION";

export type BriefBook = {
  bookImage: string | null;
  title: string;
  author: string | null;
  primaryISBN10: string;
  primaryISBN13: string;
};
