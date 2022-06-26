import db from "database/db";

const userBook = db.userBook;

export function startReadingBook(userId: string, bookId: string) {
  return userBook.create({
    data: { status: "READING", userId, bookId },
  });
}

export function finishReadingBook(userId: string, bookId: string) {
  return userBook.update({
    where: { userId_bookId: { bookId, userId } },
    data: { status: "HAVE_READ" },
  });
}

export function cancelReadingBooks(userId: string, bookId: string) {
  return userBook.delete({
    select: null,
    where: { userId_bookId: { bookId, userId } },
  });
}

export function cancelFinishingBook(userId: string, bookId: string) {
  return userBook.update({
    select: null,
    where: { userId_bookId: { bookId, userId } },
    data: { status: "READING" },
  });
}

export function getUserAllBooks(userId: string) {
  return userBook.findMany({
    where: { userId },
    select: { bookId: true, status: true, rating: true },
  });
}
