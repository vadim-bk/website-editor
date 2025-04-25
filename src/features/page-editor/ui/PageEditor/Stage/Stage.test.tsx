import { fireEvent, render, screen } from "@testing-library/react";
import { Stage } from ".";
import { StageColumnContentType, StageRow, StageColumnAlignment, TextColumn, ImageColumn } from "../../../types";
import { setupEditorStoreMock } from "../../../test/mocks";

jest.mock("../../../store");

const textColumn1: TextColumn = {
  id: "col-1-1",
  type: StageColumnContentType.Text,
  text: "Hello",
  textAlign: StageColumnAlignment.Left,
};

const imageColumn: ImageColumn = {
  id: "col-1-2",
  type: StageColumnContentType.Image,
  imageUrl: "test.jpg",
  altText: "Test image",
};

const textColumn2: TextColumn = {
  id: "col-2-1",
  type: StageColumnContentType.Text,
  text: "World",
  textAlign: StageColumnAlignment.Left,
};

const mockRows: StageRow[] = [
  {
    id: "row-1",
    columns: [textColumn1, imageColumn],
  },
  {
    id: "row-2",
    columns: [textColumn2],
  },
];

beforeEach(() => {
  setupEditorStoreMock({ rows: mockRows });
});

it("renders all rows and content from the editor store", () => {
  render(<Stage selectedColumnId={null} selectedRowId={null} onDeselect={jest.fn()} onSelect={jest.fn()} />);

  expect(screen.getByTestId("stage")).toBeInTheDocument();
  expect(screen.getByText("Hello")).toBeInTheDocument();
  expect(screen.getByText("World")).toBeInTheDocument();
});

it("calls onDeselect when focusing the stage container", () => {
  const mockOnDeselect = jest.fn();
  render(<Stage selectedColumnId={null} selectedRowId={null} onDeselect={mockOnDeselect} onSelect={jest.fn()} />);

  const stage = screen.getByTestId("stage");
  fireEvent.focus(stage);

  expect(mockOnDeselect).toHaveBeenCalledTimes(1);
});

it("calls onSelect with row id when a row is focused", () => {
  const mockOnSelect = jest.fn();
  render(<Stage selectedColumnId={null} selectedRowId={null} onDeselect={jest.fn()} onSelect={mockOnSelect} />);

  const rows = screen.getAllByTestId("row");
  fireEvent.focus(rows[0]);

  expect(mockOnSelect).toHaveBeenCalledWith("row-1");
});
