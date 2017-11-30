/*@flow*/
import { User, UpdatedTag, Tag } from './flowTypes';

export const findById = <T: { id: number }>(
  id: number,
  list: Array<T> // eslint-disable-next-line
): T | void => list.find((item: T) => item.id == id);

export const findByName = (name: string, list: Array<User>) =>
  list.find(item => item.display_name === name);

export const toggleItem = (item: string, list: Array<string>) => {
  const index = list.indexOf(item);
  console.log(index);
  return -1 === index
    ? [...list, item]
    : [...list.slice(0, index), ...list.slice(index + 1)];
};

export const filterTags = (tags: Array<Tag>): Array<UpdatedTag> => {
  let updatedTags = [];
  tags.forEach(tag => {
    updatedTags.push({ id: Number(tag.id), label: tag.name });
  });
  return updatedTags;
};

export const filterCategories = (data: {}) => {
  let categories = [];
  for (let key in data) {
    let categoryGroup = data[key]['children'];
    if (undefined !== categoryGroup) {
      categoryGroup.forEach(function(category) {
        categories.push({
          label: category['cat_name'],
          id: Number(category['id'])
        });
      });
    } else {
      let category = data[key];
      categories.push({
        id: Number(category['id']),
        label: category['name']
      });
    }
  }
  return categories;
};

export const mapPostType = (postType: string) => {
  const normalTypes = ['normal', 'longform'];
  return normalTypes.includes(postType) ? 'normal' : 'club';
};
