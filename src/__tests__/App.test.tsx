import { render, screen } from "@testing-library/react";
import App from "../App";
import * as React from "react";

test("renders a starting page containing logo, and login and register buttons", () => {
  render(<App />);

  screen.getByTitle("Bookshelf");
  screen.getByRole("heading", { name: /Bookshelf/i });
  screen.getByRole("button", { name: /Login/i });
  screen.getByRole("button", { name: /Register/i });
});
