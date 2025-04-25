import { SideBarCreator } from "./SideBarCreator";
import { Stage } from "./Stage";
import { useCallback, useState } from "react";

export const PageEditor = () => {
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);

  const handleSelect = useCallback(
    (rowId: string) => (columnId?: string) => {
      setSelectedRowId(rowId);
      setSelectedColumnId(columnId ?? null);
    },
    []
  );

  const handleDeselect = useCallback(() => {
    setSelectedColumnId(null);
    setSelectedRowId(null);
  }, []);

  return (
    <div className="editor">
      <Stage
        selectedRowId={selectedRowId}
        selectedColumnId={selectedColumnId}
        onDeselect={handleDeselect}
        onSelect={handleSelect}
      />

      <SideBarCreator
        selectedColumnId={selectedColumnId}
        selectedRowId={selectedRowId}
        setSelectedColumnId={setSelectedColumnId}
        setSelectedRowId={setSelectedRowId}
      />
    </div>
  );
};
