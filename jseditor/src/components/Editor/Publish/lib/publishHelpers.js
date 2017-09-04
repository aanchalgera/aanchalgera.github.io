// @flow
type User = { id: number, display_name: string };

export const findById = <T: { id: number }>(
  id: number,
  list: Array<T>
): T | void => list.find((item: T) => item.id === id);

export const findByName = (name: string, list: Array<User>) =>
  list.find(item => item.display_name === name);

export const toggleItem = (item: string, list: Array<string>) => {
  const index = list.indexOf(item);
  -1 === index ? list.push(item) : list.splice(index, 1);
};

export const getCategories = (data: {}) => {
  let categories = [];
  for (let key in data) {
    let categoryGroup = data[key]['children'];
    if (undefined !== categoryGroup) {
      categoryGroup.forEach(function(category) {
        categories.push({
          categoryName: category['cat_name'],
          id: Number(category['id'])
        });
      });
    } else {
      let category = data[key];
      categories.push({
        id: Number(category['id']),
        categoryName: category['name']
      });
    }
  }
  return categories;
};
