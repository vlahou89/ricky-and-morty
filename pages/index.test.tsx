import { render, screen } from "@testing-library/react";
import Home from "./";

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: { page: "1" },
  }),
}));

let fetchMock: jest.Mock;

beforeEach(() => {
  fetchMock = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ info: {}, results: [] }),
    } as Response)
  );
  global.fetch = fetchMock;
});

afterEach(() => {
  fetchMock.mockClear();
});

test("renders character names", async () => {
  render(
    <Home
      data={{
        info: {
          next: "",
        },

        results: [
          {
            id: 1,
            name: "Character 1",
            status: "Alive",
            image: "image-url-1",
            species: "Species 1",
            type: "Type 1",
            gender: "Gender 1",
            origin: { name: "Origin 1" },
            location: { name: "Location 1" },
            episode: ["Episode 1"],
          },
          {
            id: 2,
            name: "Character 2",
            status: "Dead",
            image: "image-url-2",
            species: "Species 2",
            type: "Type 2",
            gender: "Gender 2",
            origin: { name: "Origin 2" },
            location: { name: "Location 2" },
            episode: ["Episode 2"],
          },
        ],
      }}
    />
  );

  const characterNames = screen.getAllByText(/Character \d/);

  expect(characterNames).toHaveLength(2);
});
