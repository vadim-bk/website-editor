export enum StageColumnContentType {
  Text = "text",
  Image = "image",
}

export enum StageColumnAlignment {
  Left = "left",
  Center = "center",
  Right = "right",
}

export type BaseColumn = {
  id: string;
  type: StageColumnContentType | null;
};

export type EmptyColumn = {
  id: string;
  type: null;
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

export type StageColumn = TextColumn | ImageColumn | EmptyColumn;

export type StageRow = {
  id: string;
  columns: StageColumn[];
};
