import { ChangeEvent, useCallback } from "react";
import { StageColumn, ImageColumn } from "../../../../../types";

type Props = {
  column: ImageColumn;
  onChange: (values: Partial<StageColumn>) => void;
};

export const ImageSection = ({ column, onChange }: Props) => {
  const { imageUrl = "", altText = "" } = column;

  const handleUrlChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange({ imageUrl: event.target.value });
    },
    [onChange]
  );

  const handleAltTextChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange({ altText: event.target.value });
    },
    [onChange]
  );

  return (
    <div className="section">
      <div className="section-header">Image</div>

      <div className="text-field">
        <label htmlFor="image-url">URL</label>
        <input id="image-url" type="text" autoFocus value={imageUrl} onChange={handleUrlChange} />
      </div>

      <div className="text-field">
        <label htmlFor="image-alt">Alt Text</label>
        <input
          id="image-alt"
          type="text"
          value={altText}
          onChange={handleAltTextChange}
          placeholder="Describe the image for accessibility"
        />
      </div>
    </div>
  );
};
