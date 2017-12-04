import { CHANGE_TITLE, ADD_IMAGE, RECEIVE_POST } from 'actions/post';

const initialState = [
  {
    id: 0,
    type: 'title'
  }
];

const sections = (sections = initialState, action) => {
  switch (action.type) {
    case RECEIVE_POST:
      const { post } = action;
      return post.sections || initialState;
    case CHANGE_TITLE:
      return [
        {
          id: 0,
          type: 'title',
          text: action.title
        },
        ...sections.slice(1)
      ];
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
