import { CHANGE_TITLE, ADD_IMAGE } from 'actions/post';

const initialState = [];

const sections = (sections = initialState, action) => {
  switch (action.type) {
    case CHANGE_TITLE:
      if (!sections[0]) {
        sections[0] = {
          id: 0,
          type: 'title'
        };
      }
      sections[0].text = action.title;
      return sections;
    case ADD_IMAGE:
      const { id, url, alt, index } = action.image;
      return [
        ...sections.slice(0, index),
        {
          id,
          url,
          alt,
          type: 'image'
        },
        ...sections.slice(index)
      ];
    default:
      return sections;
  }
};

export default sections;
