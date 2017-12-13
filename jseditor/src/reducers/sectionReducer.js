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
      const section = sections.slice(action.index, action.index + 1)[0];
      return [
        ...sections.slice(0, action.index),
        {
          ...section,
          text: content.text
        },
        ...sections.slice(action.index + 1)
      ];
    case ADD_SECTION:
      const { index, ...newSection } = action.section;
      let currentSection = section[index];
      const delimiter = '\n',
        start = action.position,
        tokens = currentSection.text.split(delimiter);
      const split1 = tokens.slice(0, start + 1).join(delimiter);
      const split2 = tokens.slice(start + 1).join(delimiter);
      currentSection.text = split1;
      const contentSection = {
        id: newSection.id + 1,
        type: 'content',
        text: split2
      };
      const addSections = [currentSection, newSection, contentSection];
      return [
        ...sections.slice(0, index),
        ...addSections,
        ...sections.slice(index + 1)
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
