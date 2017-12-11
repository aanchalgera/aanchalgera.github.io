import {
  CHANGE_TITLE,
  ADD_SECTION,
  RECEIVE_POST,
  CHANGE_CONTENT
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
      if (sections[index].type === 'content') {
        addSections = [newSection, contentSection];
      } else {
        addSections = [contentSection, newSection];
      }
      return [
        ...sections.slice(0, index + 1),
        ...addSections,
        ...sections.slice(index + 1)
      ];
    default:
      return sections;
  }
};

export default sections;
