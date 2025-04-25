import { StageColumn, StageColumnContentType } from "../../../../types";
import { ImageSection } from "./ImageSection";
import { TextSection } from "./TextSection";

type Props = {
  column: StageColumn;
  onChange: (values: Partial<StageColumn>) => void;
};

export const ColumnValue = ({ column, onChange }: Props) => {
  if (column.type === StageColumnContentType.Text) {
    return <TextSection column={column} onChange={onChange} />;
  }

  if (column.type === StageColumnContentType.Image) {
    return <ImageSection column={column} onChange={onChange} />;
  }

  if (column.type === StageColumnContentType.Video) {
    return (
      <div className="section">
        <div className="section-header">Video</div>
        <div className="info-message">Video editing is not yet implemented</div>
      </div>
    );
  }

  return null;
};
