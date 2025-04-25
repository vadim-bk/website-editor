import { Icons } from "shared/icons";
import { StageColumn, StageColumnAlignment, TextColumn } from "../../../../../types";
import { useCallback, ChangeEvent } from "react";
import classNames from "classnames";

const ALIGNMENT_BUTTONS = [
  {
    alignment: StageColumnAlignment.Left,
    icon: <Icons.TextAlignLeft />,
  },
  {
    alignment: StageColumnAlignment.Center,
    icon: <Icons.TextAlignCenter />,
  },
  {
    alignment: StageColumnAlignment.Right,
    icon: <Icons.TextAlignRight />,
  },
];

type Props = {
  column: TextColumn;
  onChange: (values: Partial<StageColumn>) => void;
};

export const TextSection = ({ column, onChange }: Props) => {
  const { textAlign = StageColumnAlignment.Left, text = "" } = column;

  const handleAlignmentChange = useCallback(
    (alignment: StageColumnAlignment) => () => {
      onChange({ textAlign: alignment });
    },
    [onChange]
  );

  const handleTextChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange({ text: event.target.value });
    },
    [onChange]
  );

  return (
    <div className="section">
      <div className="section-header">Text</div>

      <div className="button-group-field">
        <label>Alignment</label>

        <div className="button-group">
          {ALIGNMENT_BUTTONS.map((button) => (
            <button
              key={button.alignment}
              className={classNames({ selected: textAlign === button.alignment })}
              onClick={handleAlignmentChange(button.alignment)}
            >
              {button.icon}
            </button>
          ))}
        </div>
      </div>

      <div className="textarea-field">
        <textarea rows={8} placeholder="Enter text" autoFocus value={text} onChange={handleTextChange} />
      </div>
    </div>
  );
};
