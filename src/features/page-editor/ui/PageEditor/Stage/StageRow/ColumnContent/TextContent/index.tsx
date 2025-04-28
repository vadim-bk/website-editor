import { Markdown } from "shared/ui";
import { TextColumn, StageColumnAlignment } from "../../../../../../types";

type Props = {
  column: TextColumn;
};

export const TextContent = ({ column }: Props) => {
  const { text = "", textAlign = StageColumnAlignment.Left } = column;

  return (
    <div style={{ textAlign }}>
      <Markdown>{text}</Markdown>
    </div>
  );
};
