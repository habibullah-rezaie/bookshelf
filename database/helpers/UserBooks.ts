import db from "../db";

export function addBookToShouldRead(userid: string, bookid: string) {
  return db.userbook.create({ data: { userid, bookid } });
}

export function changeBookToReading(userid: string, bookid: string) {
  return db.userbook.update({
    where: { userid_bookid: { bookid, userid } },
    data: { state: "READING", startdate: new Date() },
  });
}

export function finishBookReading(userid: string, bookid: string) {
  return db.userbook.update({
    where: { userid_bookid: { bookid, userid } },
    data: { state: "HAVE_READ", enddate: new Date() },
  });
}

export function removeBookFromUserBooks(userid: string, bookid: string) {
  return db.userbook.delete({
    select: null,
    where: { userid_bookid: { bookid, userid } },
  });
}

export function removeBookFromReadingBooks(userid: string, bookid: string) {
  return db.userbook.update({
    select: null,
    where: { userid_bookid: { bookid, userid } },
    data: { state: "SHOULD_READ", startdate: null },
  });
}

export function removeBookFromHaveReadBooks(userid: string, bookid: string) {
  return db.userbook.update({
    select: null,
    where: { userid_bookid: { bookid, userid } },
    data: { state: "READING", enddate: null },
  });
}

export function getUserAllBooks(userid: string) {
  return db.userbook.findMany({
    where: { userid },
    select: { bookid: true, state: true, rating: true },
  });
}
