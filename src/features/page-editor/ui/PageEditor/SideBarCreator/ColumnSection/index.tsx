import { Icons } from "shared/icons";
import { StageColumn, StageColumnContentType } from "../../../../types";
import { useCallback } from "react";
import classNames from "classnames";

const COLUMN_TYPES = [
  {
    type: StageColumnContentType.Text,
    icon: <Icons.Text />,
    label: "Text",
  },
  {
    type: StageColumnContentType.Image,
    icon: <Icons.Image />,
    label: "Image",
  },
  {
    type: StageColumnContentType.Video,
    icon: <Icons.Image />,
    label: "Video",
  },
];

type Props = {
  type: StageColumnContentType;
  onTypeChange: (values: Partial<StageColumn>) => void;
};

export const ColumnSection = ({ type, onTypeChange }: Props) => {
  const handleTypeChange = useCallback(
    (newType: StageColumnContentType) => () => {
      if (newType !== type) {
        onTypeChange({ type: newType });
      }
    },
    [onTypeChange, type]
  );

  return (
    <div className="section">
      <div className="section-header">Type</div>

      <div className="column-types">
        {COLUMN_TYPES.map((columnType) => (
          <button
            key={columnType.type}
            className={classNames("column-type", { selected: columnType.type === type })}
            onClick={handleTypeChange(columnType.type)}
          >
            <span className="column-type-icon">{columnType.icon}</span>
            <span className="column-type-label">{columnType.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
