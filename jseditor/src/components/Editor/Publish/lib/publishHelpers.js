// @flow
type User = {id: number, display_name: string}

export const findById = <T: {id: number}>(id :number, list : Array<T>) : T|void =>
list.find((item: T) => item.id === id);

export const findByName = (name :string, list : Array<User>) => list.find(item => item.display_name == name);

export const toggleItem = (item :{}, list : Array<mixed>) => {
  const index = list.indexOf(item);
  (-1 === index) ? (list.push(item), list) : list.splice(index, 1);
};
