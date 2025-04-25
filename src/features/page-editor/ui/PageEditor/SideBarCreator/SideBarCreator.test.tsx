import { fireEvent, render, screen } from "@testing-library/react";
import { SideBarCreator } from ".";
import { StageColumnContentType, StageColumnAlignment, TextColumn } from "../../../types";
import {
  mockAddColumn,
  mockAddRow,
  mockGetColumnById,
  mockUpdateColumn,
  setupEditorStoreMock,
  setupUuidMock,
} from "../../../test/mocks";

jest.mock("../../../store");
jest.mock("uuid");

setupUuidMock();

const TEST_ROW_ID = "row-1";
const TEST_COLUMN_ID = "col-1";

const mockColumn: TextColumn = {
  id: TEST_COLUMN_ID,
  type: StageColumnContentType.Text,
  text: "test content",
  textAlign: StageColumnAlignment.Left,
};

const mockSetSelectedColumnId = jest.fn();
const mockSetSelectedRowId = jest.fn();

beforeEach(() => {
  setupEditorStoreMock();
  jest.clearAllMocks();
});

it("renders Page section by default when nothing is selected", () => {
  mockGetColumnById.mockReturnValue(undefined);

  render(
    <SideBarCreator
      selectedColumnId={null}
      selectedRowId={null}
      setSelectedColumnId={jest.fn()}
      setSelectedRowId={jest.fn()}
    />
  );

  expect(screen.getByText("Page")).toBeInTheDocument();
  expect(screen.getByText("Add row")).toBeInTheDocument();
  expect(screen.queryByText("Row")).not.toBeInTheDocument();
  expect(screen.queryByText("Type")).not.toBeInTheDocument();
});

it("adds row and updates selection when Add row is clicked", () => {
  render(
    <SideBarCreator
      selectedColumnId={null}
      selectedRowId={null}
      setSelectedColumnId={mockSetSelectedColumnId}
      setSelectedRowId={mockSetSelectedRowId}
    />
  );

  fireEvent.click(screen.getByText("Add row"));

  expect(mockAddRow).toHaveBeenCalled();
  expect(mockSetSelectedRowId).toHaveBeenCalled();
  expect(mockSetSelectedColumnId).toHaveBeenCalledWith(null);
});

it("shows Row section when row is selected", () => {
  render(
    <SideBarCreator
      selectedColumnId={null}
      selectedRowId={TEST_ROW_ID}
      setSelectedColumnId={jest.fn()}
      setSelectedRowId={jest.fn()}
    />
  );

  expect(screen.getByText("Row")).toBeInTheDocument();
  expect(screen.getByText("Add column")).toBeInTheDocument();
});

it("adds column and updates selection when Add column is clicked", () => {
  render(
    <SideBarCreator
      selectedColumnId={null}
      selectedRowId={TEST_ROW_ID}
      setSelectedColumnId={mockSetSelectedColumnId}
      setSelectedRowId={jest.fn()}
    />
  );

  fireEvent.click(screen.getByText("Add column"));

  expect(mockAddColumn).toHaveBeenCalled();
  expect(mockAddColumn.mock.calls[0][0]).toBe(TEST_ROW_ID);
  expect(mockSetSelectedColumnId).toHaveBeenCalled();
});

it("shows Type section when column is selected", () => {
  mockGetColumnById.mockReturnValue(mockColumn);

  render(
    <SideBarCreator
      selectedColumnId={TEST_COLUMN_ID}
      selectedRowId={TEST_ROW_ID}
      setSelectedColumnId={jest.fn()}
      setSelectedRowId={jest.fn()}
    />
  );

  expect(screen.getByText("Type")).toBeInTheDocument();
  expect(mockGetColumnById).toHaveBeenCalledWith(TEST_ROW_ID, TEST_COLUMN_ID);
});

it("updates column when type changes", () => {
  mockGetColumnById.mockReturnValue(mockColumn);

  render(
    <SideBarCreator
      selectedColumnId={TEST_COLUMN_ID}
      selectedRowId={TEST_ROW_ID}
      setSelectedColumnId={jest.fn()}
      setSelectedRowId={jest.fn()}
    />
  );

  const imageTypeButton = screen.getByText("Image").closest("button");

  if (imageTypeButton) {
    fireEvent.click(imageTypeButton);
    expect(mockUpdateColumn).toHaveBeenCalledWith(TEST_ROW_ID, TEST_COLUMN_ID, {
      type: StageColumnContentType.Image,
    });
  } else {
    throw new Error("Image button not found");
  }
});

it("clears column selection when adding new row while a column is selected", () => {
  render(
    <SideBarCreator
      selectedColumnId={TEST_COLUMN_ID}
      selectedRowId={TEST_ROW_ID}
      setSelectedColumnId={mockSetSelectedColumnId}
      setSelectedRowId={mockSetSelectedRowId}
    />
  );

  fireEvent.click(screen.getByText("Add row"));

  expect(mockAddRow).toHaveBeenCalled();
  expect(mockSetSelectedColumnId).toHaveBeenCalledWith(null);
  expect(mockSetSelectedRowId).toHaveBeenCalled();
});
