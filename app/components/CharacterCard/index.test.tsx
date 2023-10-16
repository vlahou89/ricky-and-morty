import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import CharacterCard from "./";

const mockCharacter = {
  id: 1,
  name: "Character 1",
  species: "Species 1",
  type: "Type 1",
  gender: "Gender 1",
  origin: { name: "Origin 1" },
  location: { name: "Location 1" },
  image: "/i.pinimg.com/736x/31/f8/8d/31f88dd60329078bac90b7f8e59bdd53.jpg",
  status: "Alive",
  episode: ["Episode 1", "Episode 2"],
};

describe("CharacterCard Component", () => {
  it("renders the character name and status circle", () => {
    render(<CharacterCard character={mockCharacter} openModal={() => {}} />);

    const characterCard = screen.getByTestId("character-card");
    const characterName = screen.getByText("Character 1");
    const statusCircle = screen.getByTestId("status-circle");

    expect(characterCard).toBeTruthy();
    expect(characterName).toBeTruthy();
    expect(statusCircle).toBeTruthy();
  });

  it("calls openModal with the character object when clicked", () => {
    const openModal = jest.fn();
    render(<CharacterCard character={mockCharacter} openModal={openModal} />);

    const characterCard = screen.getByTestId("character-card");

    fireEvent.click(characterCard);

    expect(openModal).toHaveBeenCalledTimes(1);
  });
});
