import { Icons } from "shared/icons";
import { StageColumn, StageColumnContentType } from "../../../../types";
import { useCallback } from "react";
import classNames from "classnames";

const COLUMN_TYPES = [
  {
    type: StageColumnContentType.Text,
    icon: <Icons.Text />,
  },
  {
    type: StageColumnContentType.Image,
    icon: <Icons.Image />,
  },
];

type Props = {
  type: StageColumnContentType | null;
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
      <div className="section-header">Column</div>

      <div className="button-group-field">
        <label>Contents</label>

        <div className="button-group">
          {COLUMN_TYPES.map((columnType) => (
            <button
              key={columnType.type}
              className={classNames({ selected: columnType.type === type })}
              onClick={handleTypeChange(columnType.type)}
            >
              {columnType.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
