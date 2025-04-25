type Props = {
  onAddColumn: () => void;
};

export const RowSection = ({ onAddColumn }: Props) => {
  return (
    <div className="section">
      <div className="section-header">Row</div>

      <div className="actions">
        <button className="action" onClick={onAddColumn}>
          Add column
        </button>
      </div>
    </div>
  );
};
