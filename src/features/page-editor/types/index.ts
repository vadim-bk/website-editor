export enum StageColumnContentType {
  Text = "text",
  Image = "image",
  Video = "video",
}

export enum StageColumnAlignment {
  Left = "left",
  Center = "center",
  Right = "right",
}

export type BaseColumn = {
  id: string;
  type: StageColumnContentType;
};

export type TextColumn = BaseColumn & {
  type: StageColumnContentType.Text;
  text: string;
  textAlign: StageColumnAlignment;
};

export type ImageColumn = BaseColumn & {
  type: StageColumnContentType.Image;
  imageUrl: string;
  altText: string;
};

export type VideoColumn = BaseColumn & {
  type: StageColumnContentType.Video;
  videoUrl: string;
  autoplay: boolean;
};

export type StageColumn = TextColumn | ImageColumn | VideoColumn;

export type StageRow = {
  id: string;
  columns: StageColumn[];
};
