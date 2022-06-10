import { readingstate as ReadingStatuses } from "@prisma/client";
import { Button, CircleButton } from "components/lib/Buttons";
import Rating from "components/lib/Rating";
import * as React from "react";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { FaBook, FaCheck, FaHeart, FaMinus, FaRegHeart } from "react-icons/fa";

function BookCard({
  id,
  title = `My Sample Book's Title kdsjflksjf dlkafdl;kfj al;d kflakdjf My Sample
Book's Title kdsjflksjfdlkafdl;kfjal;dkflakdjf`,
}: {
  id: string;
  title?: string;
}) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [readingStatus, setReadingStatus] = React.useState<
    ReadingStatuses | "none"
  >("none");

  const toggleIsFavorite = () =>
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  return (
    <section className="relative max-w-fit text-xxs md:text-base pr-2 pb-4 rounded-md flex flex-col overflow-hidden shadow-sm hover:shadow-md border-[1px] outline-none focus:outline-none  text-black">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-20 ">
          <img src="book.jpeg" alt="a book" className="w-full" />
        </div>
        <div className="text-center">
          <h3 className="text-sm text-indigo" title={title}>
            {title.substring(0, 20) + "..."}
          </h3>
          <p className="text-indigoLighten80 text-[.6rem]">Habibullah Rezaie</p>
          <div className="flex justify-center">
            <Rating
              id={id}
              rating={3}
              setRating={(rating: number) => console.log("rated ", rating)}
            />
          </div>
        </div>
      </div>
      <div className="px-1">
        <div className="flex justify-center my-3">
          <div className="flex flex-col px-3 border-r-[1px] border-indigoLighten80">
            <p>192</p> <p className="text-indigoLighten80">Pages</p>
          </div>
          <div className="flex flex-col px-3 border-r-[1px] border-indigoLighten80">
            <p>2022</p> <p className="text-indigoLighten80">Release</p>
          </div>
          <div className="flex flex-col px-3 ">
            <p>101k</p> <p className="text-indigoLighten80">Reading</p>
          </div>
        </div>
        <p className="relative h-10 mb-5 overflow-y-hidden after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gray-50 after:bg-opacity-50">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed nam
          eligendi iusto aliquid eaque dolorum? Dicta aliquam aspernatur
          architecto. Minima, corporis saepe. Possimus, dolor? Accusantium quos
          sint minima quasi quam.
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