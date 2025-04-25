import { Markdown } from "shared/ui";
import { TextColumn } from "../../../../../../types";

type Props = {
  column: TextColumn;
};

export const TextContent = ({ column }: Props) => {
  return (
    <div style={{ textAlign: column.textAlign }}>
      <Markdown>{column.text}</Markdown>
    </div>
  );
};
