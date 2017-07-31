export const findById = (id, list) => list.find(item => item.id === id);

export const findByName = (name, list) => list.find(item => item.display_name == name);

export const toggleItem = (item, list) => {
  const index = list.indexOf(item);
  (-1 === index) ? (list.push(item), list) : list.splice(index, 1);
};
