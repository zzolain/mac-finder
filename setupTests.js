import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

beforeAll(() => {});
afterEach(() => {});
afterAll(() => {
  cleanup();
});
