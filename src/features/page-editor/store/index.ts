import { create } from "zustand";
import { LOCAL_STORAGE_KEYS } from "shared/constant";
import { persist } from "zustand/middleware";
import { StageColumn, StageColumnContentType, StageColumnAlignment, StageRow } from "../types";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_ROW: StageRow = {
  id: uuidv4(),
  columns: [
    {
      id: uuidv4(),
      type: StageColumnContentType.Text,
      text: "# Untitled",
      textAlign: StageColumnAlignment.Center,
    },
  ],
};

type EditorState = {
  rows: StageRow[];
};

type EditorActions = {
  addRow: (id: string) => void;
  addColumn: (rowId: string, id: string) => void;
  getColumnById: (rowId: string | null, id: string | null) => StageColumn | undefined;
  updateColumn: (rowId: string, columnId: string, values: Partial<StageColumn>) => void;
};

export const useEditorStore = create<EditorState & EditorActions>()(
  persist(
    (set, get) => ({
      rows: [DEFAULT_ROW],

      getColumnById: (rowId, id) =>
        get()
          .rows.find((row) => row.id === rowId)
          ?.columns.find((column) => column.id === id),

      addRow: (id) => set((state) => ({ rows: [...state.rows, { id, columns: [] }] })),

      addColumn: (rowId, id) =>
        set((state) => ({
          rows: state.rows.map((row) => {
            if (row.id === rowId) {
              return { ...row, columns: [...row.columns, { id, type: null }] };
            }

            return row;
          }),
        })),

      updateColumn: (rowId, columnId, values) =>
        set((state) => {
          const rows = state.rows.map((row) => {
            if (row.id !== rowId) return row;

            const columns = row.columns.map((column) => {
              if (column.id !== columnId) return column;

              // If type is changing, set the appropriate defaults
              if (values.type && values.type !== column.type) {
                if (values.type === StageColumnContentType.Text) {
                  return {
                    id: column.id,
                    type: StageColumnContentType.Text,
                    text: "",
                    textAlign: StageColumnAlignment.Left,
                  } as StageColumn;
                }
                if (values.type === StageColumnContentType.Image) {
                  return {
                    id: column.id,
                    type: StageColumnContentType.Image,
                    imageUrl: "",
                    altText: "",
                  } as StageColumn;
                }
                return { id: column.id, type: null } as StageColumn;
              }

              // Simple merge of values
              return { ...column, ...values } as StageColumn;
            });

            return { ...row, columns };
          });

          return { rows };
        }),
    }),
    {
      name: LOCAL_STORAGE_KEYS.EDITOR_STORAGE,
    }
  )
);
