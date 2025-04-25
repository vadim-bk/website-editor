import { ImagePlaceholder } from "shared/ui";
import { ImageColumn } from "../../../../../../types";
import { useCallback, useState } from "react";

type Props = {
  column: ImageColumn;
};

export const ImageContent = ({ column }: Props) => {
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  if (!column.imageUrl || hasError) {
    return <ImagePlaceholder />;
  }

  return <img src={column.imageUrl} alt={column.altText || "Image"} onLoad={handleLoad} onError={handleError} />;
};
