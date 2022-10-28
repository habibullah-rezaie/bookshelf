import { Combobox } from "@headlessui/react";
import { Button } from "src/components/lib/Buttons/Buttons";
import { matchSorter } from "match-sorter";
import React from "react";
import { FaAngleUp, FaAngleDown, FaCheck } from "react-icons/fa";
import { BookLanguage } from "src/types/DiscoverBooksScreenTypes";
import languageCodes from "./language-codes.json";

// TODO Omptimize filters loading, selecting ...
function FilterByLangComboBox({
  setSelectedLang,
  selectedLang,
}: {
  setSelectedLang: React.Dispatch<React.SetStateAction<BookLanguage | null>>;
  selectedLang: BookLanguage | null;
}) {
  const [query, setQuery] = React.useState("");

  const filteredLangs =
    query === ""
      ? languageCodes
      : matchSorter(languageCodes, query, {
          keys: ["English"],
        });

  return (
    <>
      <Combobox
        value={selectedLang}
        onChange={(value) => {
          setSelectedLang(value);
        }}
      >
        {({ open }) => (
          <>
            <Combobox.Label className={`font-medium mb-1`}>
              Language:{" "}
            </Combobox.Label>
            <div className="relative transition-all duration-150 border-[1px] border-indigo focus-within:ring-1 focus-within:ring-indigo focus-within:ring-opacity-40 rounded-md overflow-hidden bg-gray-50">
              <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(lang: BookLanguage) => lang?.English}
                className={`outline-hidden outline-0 focus:outline-0 focus:outline-hidden rounded-md w-full p-1 pr-4 leading-5 rounded-b-none`}
              />
              <Combobox.Button
                className={`absolute top-0.5 right-0 h-6 w-5 text-center `}
                as={Button}
                variant={"plain"}
              >
                {open ? <FaAngleUp /> : <FaAngleDown />}
              </Combobox.Button>
              {open && <hr className="text-indigo" />}
              <Combobox.Options className={"max-h-25 h-20 overflow-x-hidden"}>
                {filteredLangs.map((language) => (
                  <Combobox.Option
                    key={language.alpha2}
                    value={language}
                    as={React.Fragment}
                  >
                    {({ active, selected }) => {
                      return (
                        <li
                          key={language.alpha2}
                          className={`px-1 py-1 justify-between flex items-center  max-w-full  ${
                            active
                              ? `bg-logoBlue text-white`
                              : "bg-gray-50 text-black"
                          }`}
                        >
                          <span>{language.English}</span>
                          {selected && (
                            <FaCheck
                              className={`${
                                active ? "text-white" : "text-logoBlue"
                              } w-5`}
                            />
                          )}
                        </li>
                      );
                    }}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </>
        )}
      </Combobox>
    </>
  );
}

export default FilterByLangComboBox;
