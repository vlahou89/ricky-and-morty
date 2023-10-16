import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "./";

test("renders button with the provided text", () => {
  const buttonText = "Click Me";
  const onClick = jest.fn();

  const { getByText } = render(
    <Button text={buttonText} onClick={onClick} className="custom-class" />
  );

  const buttonElement = getByText(buttonText);

  expect(buttonElement).toBeTruthy();
  expect(buttonElement.textContent).toBe(buttonText);

  fireEvent.click(buttonElement);

  expect(onClick).toHaveBeenCalledTimes(1);
});
