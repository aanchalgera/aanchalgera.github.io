import {
  CHANGE_TITLE,
  ADD_IMAGE,
  RECEIVE_POST,
  CHANGE_CONTENT
} from 'actions/post';

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
    case CHANGE_CONTENT:
      const { content } = action;
      const section = sections.slice(content.index, content.index + 1)[0];
      return [
        ...sections.slice(0, content.index),
        {
          ...section,
          text: content.text
        },
        ...sections.slice(content.index + 1)
      ];
    case ADD_IMAGE:
      const { index, ...attributes } = action.image;
      return [
        ...sections.slice(0, index),
        {
          ...attributes,
          type: 'image'
        },
        ...sections.slice(index)
      ];
    default:
      return sections;
  }
};

export default sections;
