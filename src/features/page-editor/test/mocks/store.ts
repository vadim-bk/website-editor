import { StageColumnContentType, StageRow, StageColumnAlignment, TextColumn } from "../../types";

const textColumn: TextColumn = {
  id: "col-1-1",
  type: StageColumnContentType.Text,
  text: "Hello World",
  textAlign: StageColumnAlignment.Left,
};

const mockDefaultRows: StageRow[] = [{ id: "row-1", columns: [textColumn] }];

let mockRowsState = [...mockDefaultRows];

export const mockGetColumnById = jest.fn().mockImplementation((rowId: string | null, columnId: string | null) => {
  if (rowId === "row-1" && columnId === "col-1-1") {
    return mockDefaultRows[0].columns[0];
  }

  return undefined;
});

export const mockAddRow = jest.fn().mockImplementation((id: string) => {
  mockRowsState = [...mockRowsState, { id, columns: [] }];
});

export const mockAddColumn = jest.fn();
export const mockUpdateColumn = jest.fn();

export const setupEditorStoreMock = (customStore?: Record<string, any>) => {
  const defaultMock = {
    rows: mockRowsState,
    getColumnById: mockGetColumnById,
    addRow: mockAddRow,
    addColumn: mockAddColumn,
    updateColumn: mockUpdateColumn,
  };

  const mockStore = { ...defaultMock, ...customStore };

  const storeMock = jest.requireMock("../../store");
  storeMock.useEditorStore = jest.fn().mockImplementation(() => mockStore);

  return mockStore;
};
