export type User = { id: number, display_name: string };
export type UpdatedTag = { id: number, name: string };
export type Tag = {
  id: string,
  name: string,
  nicename: string,
  tag_count: string
};

export type CategoryType = {
  id: number,
  label: string
};

export type Image = {
  src: string,
  extension: string,
  width: number,
  height: number
};

export type InputEvent = Event & { target: HTMLInputElement };

export type Action = { type: string } | { type: string, payload: Object };

export type S3Image = { src: string, extension: string, width: number, height: number };
