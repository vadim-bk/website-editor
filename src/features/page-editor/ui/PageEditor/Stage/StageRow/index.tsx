import { Column, Row } from "shared/ui";
import { ColumnContent } from "./ColumnContent";
import { StageColumn as StageColumnType } from "../../../../types";
import { useCallback } from "react";

type Props = {
  columns: StageColumnType[];
  isSelected: boolean;
  selectedColumnId: string | null;
  onSelect: (columnId?: string) => void;
};

export const StageRow = ({ columns, isSelected, selectedColumnId, onSelect }: Props) => {
  const handleColumnSelect = useCallback(
    (columnId: string | undefined) => () => {
      onSelect(columnId);
    },
    [onSelect]
  );

  return (
    <Row selected={isSelected} onSelect={onSelect} data-testid="row">
      {columns.map((column) => (
        <Column
          key={column.id}
          selected={selectedColumnId === column.id}
          onSelect={handleColumnSelect(column?.id)}
          data-testid="column"
        >
          <ColumnContent column={column} />
        </Column>
      ))}
    </Row>
  );
};
