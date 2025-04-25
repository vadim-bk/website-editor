import { SelectableContainer } from "shared/ui";
import { StageRow } from "./StageRow";
import { useEditorStore } from "../../../store";

type Props = {
  selectedColumnId: string | null;
  selectedRowId: string | null;
  onDeselect: () => void;
  onSelect: (rowId: string) => (columnId?: string) => void;
};

export const Stage = ({ selectedColumnId, selectedRowId, onDeselect, onSelect }: Props) => {
  const { rows } = useEditorStore();

  return (
    <SelectableContainer className="stage" onSelect={onDeselect} data-testid="stage">
      {rows.map((row) => (
        <StageRow
          key={row.id}
          columns={row.columns}
          isSelected={!selectedColumnId && selectedRowId === row.id}
          selectedColumnId={selectedColumnId}
          onSelect={onSelect(row.id)}
        />
      ))}
    </SelectableContainer>
  );
};
