import {
  CHANGE_TITLE,
  ADD_SECTION,
  RECEIVE_POST,
  CHANGE_CONTENT,
  DELETE_SECTION
} from 'actions/post';

const initialState = [
  {
    id: 0,
    type: 'title'
  },
  {
    id: 1,
    type: 'content',
    text: ''
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
    case ADD_SECTION:
      const { index, ...newSection } = action.section;
      const contentSection = {
        id: newSection.id + 1,
        type: 'content',
        text: ''
      };
      let addSections = [];
      if (sections[index - 1].type === 'content') {
        addSections = [newSection, contentSection];
      } else {
        addSections = [contentSection, newSection];
      }
      return [
        ...sections.slice(0, index),
        ...addSections,
        ...sections.slice(index)
      ];
    case DELETE_SECTION:
      if (
        sections[action.index - 1]['type'] === 'content' &&
        sections[action.index - 1]['text'] === ''
      ) {
        return [
          ...sections.slice(0, action.index - 1),
          ...sections.slice(action.index + 1)
        ];
      }
      return [
        ...sections.slice(0, action.index),
        ...sections.slice(action.index + 1)
      ];
    default:
      return sections;
  }
};

export default sections;
