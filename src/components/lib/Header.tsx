import React from "react";
import { FaBars, FaCross, FaTimes } from "react-icons/fa";
import { Button, OutlineButton } from "./Buttons";
import { Stack } from "./Layout";

// FEATURE: Generalize header more
// FEATURE: May be use a compound component for nav
//  Like NavItem, ExpandableNavItem
function Header({
  Logo,
  userName,
  userProfileIMG,
}: {
  Logo: JSX.Element;
  userName: string;
  userProfileIMG: string;
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header
      className={`fixed inset-0 z-50 w-[98%] max-h-10 bg-white flex items-center justify-between mx-1 my-1 px-2 py-6 text-sm md:text-base text-ellipsis rounded-md border-[1px] border-logoDarkGray ${
        menuOpen ? "border-b-0 rounded-b-none" : ""
      }`}
    >
      <div className="flex flex-row justify-center items-center ">
        <span className="w-8 h-8 md:w-12 md:h-12">{Logo}</span>
        <h1 className="text-xl lg:text-2xl pl-2 text-logoBlue cursor-pointer">
          Bookshelf
        </h1>
      </div>
      <Stack gap={3} className="items-center grid-flow-col-dense">
        <nav
          className={`${
            menuOpen ? "block border-[1px]" : "hidden"
          } md:block absolute top-[99.7%] -right-[1px] -left-[1px] bg-white  border-logoDarkGray border-t-0 rounded-md rounded-t-none`}
        >
          <ul>
            <Stack
              gap={2}
              direction={"vertical"}
              className="w-full md:grid-flow-col-dense justify-center text-gray-600 text-center"
            >
              <li className="hover:scale-105 hover:translate-y-[1px] transition-all duration-150 hover:text-logoBlue pt-2 rounded-sm">
                <a href="#discover">Discover</a>
              </li>
              <li className="hover:scale-105 hover:translate-y-[1px] transition-all duration-150 hover:text-logoBlue pt-2 rounded-sm">
                <a href="#favorite-books">Favorite Books</a>
              </li>
              <li className="hover:scale-105 hover:translate-y-[1px] transition-all duration-150 hover:text-logoBlue pt-2 rounded-sm">
                <a href="#books-should-read">Should Read</a>
              </li>
              <li className="hover:scale-105 hover:translate-y-[1px] transition-all duration-150 hover:text-logoBlue pt-2 rounded-sm">
                <a href="#books-finished">Finished Books</a>
              </li>
              <li className="hover:scale-105 hover:translate-y-[1px] transition-all duration-150 hover:text-logoBlue pt-2 rounded-sm">
                <a href="#books-reading">Books Reading</a>
              </li>
              <li className="hover:scale-105 hover:translate-y-[1px] transition-all duration-150 py-2 rounded-sm hover:text-logoOrange">
                <Button variant="plain" className="">
                  Logout
                </Button>
              </li>
            </Stack>
          </ul>
        </nav>
        {/* TODO: Make this working */}
        <div className="rounded-[50%] z-10 h-8 w-8 overflow-hidden shadow-sm border bg-white border-logoGray border-opacity-40 hover:ring-4 ring-logoDarkGray ring-opacity-30 transition-all duration-150">
          <img
            src="profile.jpg"
            alt={userName}
            className="max-h-full -z-10 m-auto"
            title={`${userName}'s Profile`}
          />
        </div>

        <Button
          variant="plain"
          className={`hover:bg-transparent duration-500 ${
            menuOpen &&
            `hover:ring-1 hover:ring-offset-4 hover:ring-logoDarkGray`
          } text-gray-500 hover:text-gray-600`}
          style={{
            padding: 0,
          }}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </Button>
      </Stack>
    </header>
  );
}

export default Header;
