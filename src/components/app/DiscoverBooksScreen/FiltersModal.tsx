import { Switch } from "@headlessui/react";
import { Button } from "src/components/lib/Buttons/Buttons";
import { Form, Input } from "src/components/lib/Forms";
import { Stack } from "src/components/lib/Layout";
import useModal from "src/components/lib/Modal";
import * as React from "react";
import { BiCategory } from "react-icons/bi";
import { FaBarcode, FaHome } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import {
  BookLanguage,
  setFilters as FilterSetter,
} from "src/types/DiscoverBooksScreenTypes";
import FilterByLangComboBox from "./FilterByLangComboBox";

function FiltersModal({
  isOpen,
  onClose,
  setFilters,
  setFiltersSubmitted,
}: {
  isOpen: boolean;
  onClose: () => void;
  setFilters: FilterSetter;
  setFiltersSubmitted: (bool: boolean) => void;
}) {
  const Modal = useModal("#root");

  const [publisher, setPublisher] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [ISBN, setISBN] = React.useState("");
  const [downloadable, setDownloadable] = React.useState<"true" | "false">(
    "false"
  );
  const [sortBy, setSortBy] = React.useState<"relevance" | "newest">(
    "relevance"
  );
  const [selectedLang, setSelectedLang] = React.useState<BookLanguage | null>(
    null
  );

  function handleSortByChange() {
    setSortBy((prevSortBy) =>
      prevSortBy === "newest" ? "relevance" : "newest"
    );
  }

  function setFiltersAndClose(setSubmitFlag: boolean) {
    setFilters({
      publisher,
      author,
      isbn: ISBN,
      category,
      downloadable: downloadable === "true" ? true : false,
      language: selectedLang?.alpha2,
      sortBy: sortBy,
    });

    setFiltersSubmitted(setSubmitFlag);
    onClose();
  }
  function handleFormSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    setFiltersAndClose(true);
  }

  return (
    <Modal
      className={`mx-0 transition-all  duration-150 scroll-smooth back`}
      overlayClassName={`z-10 backdrop-blur-[1px] backdrop-brightness-75`}
      contentLabel="Filter Options"
      modalTitle="Filter Options"
      isOpen={isOpen}
      onClose={() => setFiltersAndClose(false)}
    >
      <Form onSubmit={handleFormSubmit} className={`text-xs`}>
        <Stack
          gap={0}
          className="peer items-center rounded-md ring-1 ring-opacity-40 ring-logoDarkGray focus-within:ring-2 focus-within:ring-opacity-80  focus-within:ring-logoBlue focus-within:border-[1px] focus-within:border-none max-w-full overflow-hidden"
        >
          <label htmlFor="author-filter" className="sr-only">
            Author
          </label>
          <div className="flex items-center py-0.5 px-1.5 bg-indigo bg-opacity-60 h-full">
            <IoMdPerson title="Author" />
          </div>
          <Input
            id="author-filter"
            placeholder="filter by author"
            value={author}
            onChange={(ev) => setAuthor(ev.target.value)}
          />
        </Stack>
        <Stack
          gap={0}
          className="peer items-center rounded-md ring-1 ring-opacity-40 ring-logoDarkGray focus-within:ring-2 focus-within:ring-opacity-80  focus-within:ring-logoBlue focus-within:border-[1px] focus-within:border-none max-w-full overflow-hidden"
        >
          <label htmlFor="publisher-filter" className="sr-only">
            Publisher
          </label>
          <div className="flex items-center py-0.5 px-1.5 bg-indigo bg-opacity-60 h-full">
            <FaHome title="Publisher" />
          </div>
          <Input
            id="publisher-filter"
            placeholder="filter by publisher"
            value={publisher}
            onChange={(ev) => setPublisher(ev.target.value)}
          />
        </Stack>
        <Stack
          gap={0}
          className="items-center rounded-md ring-1 ring-opacity-40 ring-logoDarkGray focus-within:ring-2 focus-within:ring-opacity-80  focus-within:ring-logoBlue focus-within:border-[1px] focus-within:border-none max-w-full overflow-hidden"
        >
          <div className="flex items-center py-0.5 px-1.5 bg-indigo bg-opacity-60 h-full ">
            <BiCategory title="categories" />
          </div>

          <label htmlFor="category-filter" className="sr-only">
            Category
          </label>
          <Input
            id="category-filter"
            placeholder="filter by category"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          />
        </Stack>
        <Stack
          gap={0}
          className="items-center rounded-md ring-1 ring-opacity-40 ring-logoDarkGray focus-within:ring-2 focus-within:ring-opacity-80  focus-within:ring-logoBlue focus-within:border-[1px] focus-within:border-none max-w-full overflow-hidden"
        >
          <div className="flex items-center py-0.5 px-1.5 bg-indigo bg-opacity-60 h-full ">
            <FaBarcode className="" title="ISBN" />
          </div>
          <label htmlFor="isbn-filter" className="sr-only">
            ISBN
          </label>
          <Input
            id="isbn-filter"
            placeholder="filter by ISBN"
            value={ISBN}
            onChange={(ev) => setISBN(ev.target.value)}
            // May be add some validation for isbn forms
          />
        </Stack>
        <Stack className="justify-between items-center my-3">
          <Switch.Group>
            <Switch.Label>Downloadable</Switch.Label>
            <Switch
              checked={downloadable === "true" ? true : false}
              onChange={(value) => setDownloadable(`${value}`)}
              className={`${
                downloadable === "true" ? "bg-indigo" : "bg-logoGray"
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigoLighten80 focus:ring-offset-1`}
            >
              <span
                className={`${
                  downloadable === "true" ? "translate-x-6" : "translate-x-0"
                } inline-block h-5 w-5 bg-white rounded-full border-[1px] transition-transform`}
              />
            </Switch>
          </Switch.Group>
        </Stack>
        <Stack gap={0} className="justify-between">
          <label htmlFor="sortBy-radio" className="flex-1">
            Sort By
          </label>
          <div className="w-fit" id="">
            <label
              htmlFor="sortBy-newest"
              className={`px-3 py-1.5 cursor-pointer  border-indigo border-[1px]  focus-within:ring-1 focus-within:ring-indigo focus-within:ring-opacity-40 border-r-0 rounded-l-md ${
                sortBy === "newest" ? "bg-indigo text-white" : ""
              }`}
              onClick={() => setSortBy("newest")}
            >
              Newest
              <input
                type="radio"
                name="sortBy-radio"
                id="sortBy-newest"
                className="sr-only"
                checked={sortBy === "newest"}
                onChange={handleSortByChange}
              />
            </label>
            <label
              htmlFor="sortBy-relevance"
              className={`px-3 py-1.5 cursor-pointer  border-indigo border-[1px]  focus-within:ring-1 focus-within:ring-indigo focus-within:ring-opacity-40 rounded-r-md ${
                sortBy === "relevance" ? "bg-indigo text-white" : ""
              }`}
              onClick={() => setSortBy("relevance")}
            >
              relevance
              <input
                type="radio"
                name="sortBy-radio"
                id="sortBy-relevance"
                className="sr-only"
                checked={sortBy === "relevance"}
                onChange={handleSortByChange}
              />
            </label>
          </div>
        </Stack>
        <Stack direction="vertical" className="max-w-fit">
          <FilterByLangComboBox
            setSelectedLang={setSelectedLang}
            selectedLang={selectedLang}
          />
        </Stack>
        <Button type="submit">Filter</Button>
      </Form>
    </Modal>
  );
}

export default FiltersModal;
