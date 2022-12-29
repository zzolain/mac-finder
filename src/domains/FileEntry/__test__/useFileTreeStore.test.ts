import { fileTreeDTO } from "../translator/fileEntryTranslator";
import {
  MOCK_VALID_FILE_INPUT,
  MOCK_INVALID_FILE_INPUT_1,
  MOCK_INVALID_FILE_INPUT_2,
  MOCK_INVALID_FILE_INPUT_3,
  MOCK_INVALID_FILE_INPUT_4,
  MOCK_INVALID_FILE_INPUT_5,
  MOCK_INVALID_FILE_INPUT_6,
  MOCK_INVALID_FILE_INPUT_7,
} from "./__mocks__/fileTreeDTO.mock";

test.each([
  MOCK_INVALID_FILE_INPUT_1,
  MOCK_INVALID_FILE_INPUT_2,
  MOCK_INVALID_FILE_INPUT_3,
  MOCK_INVALID_FILE_INPUT_4,
  MOCK_INVALID_FILE_INPUT_5,
  MOCK_INVALID_FILE_INPUT_6,
  MOCK_INVALID_FILE_INPUT_7,
])("when a file tree input is invalid, throw error.", (mock) => {
  expect(() => fileTreeDTO.parse(mock)).toThrowError();
});

test("when a file tree input is valid, do not throw error.", () => {
  const mapped = new Map(Object.entries(MOCK_VALID_FILE_INPUT));
  expect(() => fileTreeDTO.parse(mapped)).not.toThrowError();
});
