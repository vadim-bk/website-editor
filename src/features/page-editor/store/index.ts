import { create } from "zustand";
import { LOCAL_STORAGE_KEYS } from "shared/constant";
import { persist } from "zustand/middleware";
import {
  StageColumn,
  StageColumnContentType,
  StageColumnAlignment,
  StageRow,
  TextColumn,
  ImageColumn,
  VideoColumn,
} from "../types";
import { v4 as uuidv4 } from "uuid";

const createDefaultTextColumn = (id: string): TextColumn => ({
  id,
  type: StageColumnContentType.Text,
  text: "# Untitled",
  textAlign: StageColumnAlignment.Center,
});

const DEFAULT_ROW: StageRow = {
  id: uuidv4(),
  columns: [createDefaultTextColumn(uuidv4())],
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

const createEmptyColumn = (id: string, type: StageColumnContentType): StageColumn => {
  switch (type) {
    case StageColumnContentType.Text:
      return {
        id,
        type,
        text: "",
        textAlign: StageColumnAlignment.Left,
      };
    case StageColumnContentType.Image:
      return {
        id,
        type,
        imageUrl: "",
        altText: "",
      };
    case StageColumnContentType.Video:
      return {
        id,
        type,
        videoUrl: "",
        autoplay: false,
      };
    default:
      return createDefaultTextColumn(id);
  }
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
              return { ...row, columns: [...row.columns, createDefaultTextColumn(id)] };
            }

            return row;
          }),
        })),

      updateColumn: (rowId, columnId, values) =>
        set((state) => {
          const newRows = state.rows.map((row) => {
            if (row.id !== rowId) return row;

            const newColumns = row.columns.map((column) => {
              if (column.id !== columnId) return column;

              if ("type" in values && values.type && values.type !== column.type) {
                return createEmptyColumn(column.id, values.type);
              }

              if (column.type === StageColumnContentType.Text) {
                if ("text" in values || "textAlign" in values) {
                  return { ...column, ...values } as TextColumn;
                }
              } else if (column.type === StageColumnContentType.Image) {
                if ("imageUrl" in values || "altText" in values) {
                  return { ...column, ...values } as ImageColumn;
                }
              } else if (column.type === StageColumnContentType.Video) {
                if ("videoUrl" in values || "autoplay" in values) {
                  return { ...column, ...values } as VideoColumn;
                }
              }

              return column;
            });

            return { ...row, columns: newColumns };
          });

          return { rows: newRows };
        }),
    }),
    {
      name: LOCAL_STORAGE_KEYS.EDITOR_STORAGE,
    }
  )
);
