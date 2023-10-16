import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CharacterModal from "./";

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

const mockEpisodes = [
  { id: 1, name: "Episode 1" },
  { id: 2, name: "Episode 2" },
];

test("renders character modal with character info and episodes", () => {
  const closeModal = jest.fn();

  render(
    <CharacterModal
      character={mockCharacter}
      episodes={mockEpisodes}
      closeModal={closeModal}
    />
  );

  const characterName = screen.getByText("Character 1");
  const characterSpecies = screen.getByText("Species 1");
  const characterType = screen.getByText("Type 1");
  const characterGender = screen.getByText("Gender 1");
  const characterOrigin = screen.getByText("Origin 1");
  const characterLocation = screen.getByText("Location 1");
  const episode1 = screen.getByText("Episode 1");
  const episode2 = screen.getByText("Episode 2");

  const closeButton = screen.getByText("Close");

  expect(characterName).toBeTruthy();
  expect(characterSpecies).toBeTruthy();
  expect(characterType).toBeTruthy();
  expect(characterGender).toBeTruthy();
  expect(characterOrigin).toBeTruthy();
  expect(characterLocation).toBeTruthy();
  expect(episode1).toBeTruthy();
  expect(episode2).toBeTruthy();
  expect(closeButton).toBeTruthy();

  fireEvent.click(closeButton);
  expect(closeModal).toHaveBeenCalledTimes(1);
});
