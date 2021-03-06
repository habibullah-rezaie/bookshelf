import { rest } from "msw";
import searchJson from "src/test/data/searchResults.json"; // Two queries that is made available offline

const booksAPI = process.env.REACT_APP_BOOK_API;

const handlers = [
  rest.get(`${booksAPI}/volumes`, (req, res, ctx) => {
    const searchQuery = req.url.searchParams.get("q");
    const download = req.url.searchParams.get("download");
    // const printType= req
    const orderBy = req.url.searchParams.get("orderBy");
    const language = req.url.searchParams.get("langRestrict");

    let searchResult: any = null;

    if (searchQuery?.startsWith("islam")) {
      searchResult = handleIslamSearch(searchQuery);
    } else if (searchQuery?.startsWith("though")) {
      searchResult = handleThoughSearch(
        searchQuery,
        download,
        orderBy,
        language
      );
    } else {
      throw new Error(
        "Only search for islam or though, this is a test server!"
      );
    }
    return res(ctx.status(200), ctx.json(searchResult));
  }),
];

export default handlers;
function handleThoughSearch(
  searchQuery: string,
  download: string | null,
  orderBy: string | null,
  langRestrict: string | null
) {
  const queryMatch = searchQuery?.match(
    /^.*(?<queryType>inauthor|inpublisher|intitle|isbn|subject):(?<queryFilterValue>.*)?$/
  );
  const queryFilterType = queryMatch?.groups?.queryType;
  const queryFilterText = queryMatch?.groups?.queryFilterValue;

  if (queryFilterType) {
    switch (queryFilterType) {
      case "inauthor": {
        if (queryFilterText !== "Dr. Seuss")
          throw new Error("Only can search for Dr. Seuss as author!");

        return searchJson.though[queryFilterType][queryFilterText];
      }
      case "isbn": {
        if (queryFilterText !== "0818405562")
          throw new Error("Only can search for 0818405562 as isbn");

        return searchJson.though[queryFilterType][queryFilterText];
      }
      default:
        throw new Error(
          "You can filter by subject or publisher in this demo data"
        );
    }
  } else {
    if (download) {
      if (download !== "epub") {
        throw new Error("Only epub files are downloadable!");
      }
      return searchJson.though.download.epub;
    }

    if (orderBy) {
      if (orderBy === "newest") {
        return searchJson.though.orderBy.newest;
      } else if (orderBy === "relevance") {
        return searchJson.though; // default relevance
      }
    }

    if (langRestrict) {
      if (langRestrict === "fr") {
        return searchJson.though.langeRestrict.fr;
      } else if (langRestrict === "en") {
        return searchJson.though;
      }
    } else throw new Error("no other options are available in developement");
  }
}

function handleIslamSearch(searchQuery: string) {
  const queryMatch = searchQuery?.match(
    /^.*(?<queryType>inauthor|inpublisher|intitle|isbn|subject):(?<queryFilterValue>.*)?$/
  );
  const queryFilterType = queryMatch?.groups?.queryType;
  const queryFilterText = queryMatch?.groups?.queryFilterValue;

  switch (queryFilterType) {
    case "subject": {
      if (queryFilterText !== "islam")
        throw new Error("Only can search for islam, in this demo!");

      return searchJson.islam[queryFilterType][queryFilterText];
    }
    case "inpublisher": {
      if (queryFilterText !== "oxford")
        throw new Error("Only can search for oxford");

      return searchJson.islam[queryFilterType][queryFilterText];
    }
    default:
      throw new Error(
        "You can filter by subject or publisher in this demo data"
      );
  }
}
