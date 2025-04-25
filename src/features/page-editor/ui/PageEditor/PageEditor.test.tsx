import { fireEvent, render, screen } from "@testing-library/react";
import { PageEditor } from ".";
import { mockAddRow, setupEditorStoreMock, setupUuidMock } from "../../test/mocks";

jest.mock("../../store");
jest.mock("uuid");

setupUuidMock();

beforeEach(() => {
  setupEditorStoreMock();
});

it("renders content from the store and sidebar", () => {
  render(<PageEditor />);

  expect(screen.getByText("Hello World")).toBeInTheDocument();
  expect(screen.getByText("Page")).toBeInTheDocument();
});

it("calls addRow when Add row button is clicked", () => {
  render(<PageEditor />);

  fireEvent.click(screen.getByText("Add row"));
  expect(mockAddRow).toHaveBeenCalled();
});
