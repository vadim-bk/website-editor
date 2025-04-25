type Props = {
  onAddRow: () => void;
};

export const PageSection = ({ onAddRow }: Props) => {
  return (
    <div className="section">
      <div className="section-header">Page</div>

      <div className="actions">
        <button className="action" onClick={onAddRow}>
          Add row
        </button>
      </div>
    </div>
  );
};
