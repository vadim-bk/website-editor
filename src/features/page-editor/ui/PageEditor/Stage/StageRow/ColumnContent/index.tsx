import { ImageContent } from "./ImageContent";
import { StageColumn, StageColumnContentType } from "../../../../../types";
import { TextContent } from "./TextContent";

type Props = {
  column: StageColumn;
};

export const ColumnContent = ({ column }: Props) => {
  if (column.type === StageColumnContentType.Text) {
    return <TextContent column={column} />;
  }

  if (column.type === StageColumnContentType.Image) {
    return <ImageContent column={column} />;
  }

  return null;
};
