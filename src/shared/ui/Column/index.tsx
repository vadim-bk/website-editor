import classNames from "classnames";
import { FC } from "react";
import { SelectableContainer } from "../SelectableContainer";
export interface ColumnProps {
  children?: React.ReactNode;
  selected?: boolean;
  onSelect?(): void;
}

export const Column: FC<ColumnProps> = ({ selected, ...props }) => (
  <SelectableContainer className={classNames("column", { selected })} {...props} />
);
