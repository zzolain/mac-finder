import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { useFileTreeStore } from "./domains/FileEntry/hooks/useFileTreeStore";
import { MOCK_VALID_FILE_INPUT } from "./domains/FileEntry/__test__/__mocks__/fileTreeDTO.mock";
import { renderWithProviders } from "./__test__/render";

afterEach(() => {
  useFileTreeStore.getState().reset();
});

test("when a valid JSON file is imported, top-most folders and files from the file are listed.", async () => {
  renderWithProviders(<App />);
  const user = userEvent.setup();
  const mockJsonFile = new File(
    [new Blob([JSON.stringify(MOCK_VALID_FILE_INPUT)])],
    "valid.json",
    { type: "application/JSON" }
  );
  const input = screen.getByTestId("json-input");
  user.upload(input, mockJsonFile);
  const topMostChildrenNames = await screen.findAllByTestId("top-child");
  expect(topMostChildrenNames).toHaveLength(2);
  expect(topMostChildrenNames[0]).toHaveTextContent("apple");
  expect(topMostChildrenNames[1]).toHaveTextContent("samsung");
});
