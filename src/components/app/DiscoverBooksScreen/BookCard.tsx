import { UserBookStatus } from "@prisma/client";
import { Button } from "components/lib/Buttons";
import Rating from "components/lib/Rating";
import * as React from "react";
import { FaHeart, FaMinus, FaRegHeart } from "react-icons/fa";
import { Book } from "types/types";

function BookCard({ book }: { book: Book }) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [readingStatus, setReadingStatus] = React.useState<
    UserBookStatus | "none"
  >("none");

  const toggleIsFavorite = () =>
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);

  const title = book.volumeInfo.title;
  const img =
    book.volumeInfo.imageLinks?.smallThumbnail ||
    book.volumeInfo.imageLinks?.thumbnail ||
    "book.jpeg";

  // TODO: say author1 and author2 or author1, and 2 others
  const author = book.volumeInfo.authors?.[0] || "";
  const rating = book.volumeInfo.averageRating;
  const pageCount = book.volumeInfo.pageCount;
  const publishedYear =
    book.volumeInfo.publishedDate?.split("-")[0] || "Not sure when";
  const description = book.volumeInfo.description || "No description.";
  return (
    <section className="relative max-w-full text-xxs md:text-base pr-2 pb-4 rounded-md flex flex-col overflow-hidden shadow-sm hover:shadow-md border-[1px] outline-none focus:outline-none  text-black">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-20 ">
          <img src={img} alt={`${title}'s cover`} className="w-full" />
        </div>
        <div className="flex flex-col space-y-1 items-center text-center">
          <h3 className="text-sm text-indigo  w-[80%]" title={title}>
            {title.substring(0, 40) + `${title.length > 40 ? "..." : ""}`}
          </h3>
          <p className="text-indigoLighten80 text-[.6rem]">{author}</p>
          <div className="flex justify-center">
            <Rating
              id={book.id}
              rating={rating}
              setRating={(rating: number) => console.log("rated ", rating)}
            />
          </div>
        </div>
      </div>
      <div className="px-1">
        <div className="flex justify-center my-3">
          <div className="flex flex-col px-3 border-r-[1px] border-indigoLighten80">
            <p>{pageCount}</p> <p className="text-indigoLighten80">Pages</p>
          </div>
          <div
            className={`${
              rating > 0 && `border-r-[1px]`
            } flex flex-col px-3  border-indigoLighten80`}
          >
            <p>{publishedYear}</p>{" "}
            <p className="text-indigoLighten80">Release</p>
          </div>
          {rating > 0 && (
            <div className="flex flex-col px-3 ">
              <p>{rating}</p> <p className="text-indigoLighten80">Star</p>
            </div>
          )}
        </div>
        <p className="relative h-10 mb-5 overflow-y-hidden after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gray-50 after:bg-opacity-50">
          {description}
        </p>
        <div className="absolute left-0 z-10 bg-transparent w-full bottom-1 py-4 grid gap-3 justify-center grid-flow-col ">
          {readingStatus === "none" ? (
            <Button onClick={() => setReadingStatus("READING")}>
              Start Reading
            </Button>
          ) : readingStatus === "HAVE_READ" ? (
            <Button
              className="text-logoOrange font-bold"
              onClick={() => setReadingStatus("READING")}
            >
              Unread Book
            </Button>
          ) : (
            <Button
              className="bg-green-400 hover:bg-green-500 text-black"
              onClick={() => setReadingStatus("HAVE_READ")}
            >
              Finish Book
            </Button>
          )}

          <div className="flex bg-logoGray rounded-lg px-3 py-1 text-lg hover:ring-indigoLighten80 hover:ring-4 hover:ring-opacity-50">
            {readingStatus !== "none" && (
              <Button
                variant="plain"
                title="Remove from Reading"
                className="p-1 hover:brightness-150"
                onClick={() => setReadingStatus("none")}
              >
                <FaMinus className="text-logoOrange" />
              </Button>
            )}
            <Button
              variant="plain"
              title={!isFavorite ? "Add to favorites" : "Remove from favorites"}
              className={`p-1 hover:brightness-150`}
              onClick={toggleIsFavorite}
            >
              {isFavorite ? (
                <FaHeart className="text-logoOrange " />
              ) : (
                <FaRegHeart className="text-logoOrange" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookCard;
