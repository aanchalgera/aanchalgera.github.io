export const findById = (id, list) => list.find(item => item.id === id);

export const findByName = (name, list) => list.find(item => item.display_name == name);

export const toggleItem = (item, list) => {
  const index = list.indexOf(item);
  (-1 === index) ? (list.push(item), list) : list.splice(index, 1);
};

export const getCategories = (data) => {
  let categories = [];
  for (let key in data) {
    let categoryGroup = data[key]['children'];
    if (undefined !== categoryGroup) {
      categoryGroup.forEach(function (category) {
        categories.push({categoryName: category['cat_name'], id: category['id']});
      });
    } else {
      let category = data[key];
      categories.push({id: category['id'], categoryName: category['name']});
    }
  }
  return categories;
}