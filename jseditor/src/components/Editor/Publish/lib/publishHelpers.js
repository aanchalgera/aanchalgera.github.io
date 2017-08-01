// @flow
type User = {|id: number, display_name: string|}
export const findById = (id :number, list : Array<User>): void|User =>
list.find((item: User) => item.id === id);

export const findByName = (name :string, list : Array<{display_name: string}>) => list.find(item => item.display_name == name);

export const toggleItem = (item :{}, list : Array<mixed>) => {
  const index = list.indexOf(item);
  (-1 === index) ? (list.push(item), list) : list.splice(index, 1);
};
