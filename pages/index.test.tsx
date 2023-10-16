import { render, screen } from "@testing-library/react";
import Home from "./"; // Adjust the path as needed

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
        info: {},
        results: [
          { id: 1, name: "Character 1" },
          { id: 2, name: "Character 2" },
        ],
      }}
    />
  );

  const characters = await screen.findAllByRole("listitem");
});
