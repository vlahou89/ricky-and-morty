import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../app/components/Input";

describe("Input Component", () => {
  it("renders an input element", () => {
    render(
      <Input
        name="test-input"
        type="text"
        placeholder="Test placeholder"
        value=""
        onChange={() => {}}
      />
    );

    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toBeTruthy();
  });
});
