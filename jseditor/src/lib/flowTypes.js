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

export type InputEvent = Event & { target: HTMLInputElement };
