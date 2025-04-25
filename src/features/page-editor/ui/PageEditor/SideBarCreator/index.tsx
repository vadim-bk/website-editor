import { ColumnSection } from "./ColumnSection";
import { ColumnValue } from "./ColumnValue";
import { Dispatch, SetStateAction, useCallback } from "react";
import { PageSection } from "./PageSection";
import { RowSection } from "./RowSection";
import { StageColumn } from "../../../types";
import { useEditorStore } from "../../../store";
import { v4 as uuidv4 } from "uuid";

type Props = {
  selectedColumnId: string | null;
  selectedRowId: string | null;
  setSelectedColumnId: Dispatch<SetStateAction<string | null>>;
  setSelectedRowId: Dispatch<SetStateAction<string | null>>;
};

export const SideBarCreator = ({ selectedColumnId, selectedRowId, setSelectedColumnId, setSelectedRowId }: Props) => {
  const { getColumnById, addRow, addColumn, updateColumn } = useEditorStore();

  const column = getColumnById(selectedRowId, selectedColumnId);

  const handleAddRow = useCallback(() => {
    const id = uuidv4();

    addRow(id);
    setSelectedRowId(id);
    setSelectedColumnId(null);
  }, [addRow, setSelectedColumnId, setSelectedRowId]);

  const handleAddColumn = useCallback(() => {
    const id = uuidv4();

    if (selectedRowId) {
      addColumn(selectedRowId, id);
      setSelectedColumnId(id);
    }
  }, [addColumn, selectedRowId, setSelectedColumnId]);

  const handleColumnChange = useCallback(
    (values: Partial<StageColumn>) => {
      if (selectedRowId && column?.id) {
        updateColumn(selectedRowId, column.id, values);
      }
    },
    [updateColumn, selectedRowId, column]
  );

  return (
    <div className="properties">
      <PageSection onAddRow={handleAddRow} />

      {selectedRowId && <RowSection onAddColumn={handleAddColumn} />}

      {column && (
        <>
          <ColumnSection type={column.type} onTypeChange={handleColumnChange} />

          <ColumnValue column={column} onChange={handleColumnChange} />
        </>
      )}
    </div>
  );
};
