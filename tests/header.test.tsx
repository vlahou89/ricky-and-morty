import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../app/components/Header";

describe("Header Component", () => {
  it("renders the header with a search input", () => {
    const handleSearchInput = jest.fn();
    render(<Header searchTerm="Rick" handleSearchInput={handleSearchInput} />);

    const logoElement = screen.getByAltText("logo");
    expect(logoElement).toBeTruthy();

    const searchInputElement = screen.getByPlaceholderText(
      "Search characters..."
    );
    expect(searchInputElement).toBeTruthy();
  });
});
