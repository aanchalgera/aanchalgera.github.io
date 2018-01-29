import {
  CHANGE_TITLE,
  ADD_SECTION,
  RECEIVE_POST,
  CHANGE_CONTENT,
  DELETE_SECTION,
  EDIT_IMAGE,
  CHANGE_LAYOUT
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
      const delimiter = '\n',
        tokens = sections[index].text.split(delimiter);
      let start = action.position;
      const elements = ['<p><ol>', '<ol>', '</ol>', '<ul>', '</ul>'];
      for (let i = 0; i < start; i++) {
        if (elements.includes(tokens[i])) {
          start++;
        }
      }
      const split1 = tokens.slice(0, start).join(delimiter);
      const split2 = tokens.slice(start).join(delimiter); // remove first <br />
      const contentSection1 = {
        id: newSection.id + 1,
        type: 'content',
        text: split1
      };
      const contentSection2 = {
        id: newSection.id + 2,
        type: 'content',
        text: split2
      };
      const addSections = [contentSection1, newSection, contentSection2];
      return [
        ...sections.slice(0, index),
        ...addSections,
        ...sections.slice(index + 1)
      ];
    case DELETE_SECTION:
      const sectionToAdd = {
        id: action.data.id + 1,
        type: 'content',
        text:
          sections[action.data.index - 1]['text'] +
          sections[action.data.index + 1]['text']
      };
      return [
        ...sections.slice(0, action.data.index - 1),
        sectionToAdd,
        ...sections.slice(action.data.index + 2)
      ];
    case EDIT_IMAGE:
      const { index: imageIndex, ...changedImgAttributes } = action.image;
      const imgAttributes = sections[imageIndex];

      return [
        ...sections.slice(0, imageIndex),
        {
          ...imgAttributes,
          ...changedImgAttributes,
        },
        ...sections.slice(imageIndex + 1)
      ];
    case CHANGE_LAYOUT:
      const { layout, align } = action;
      let modifiedNode = {
        ...sections[action.index],
        layout,
        align
      };
      return [
        ...sections.slice(0, action.index),
        modifiedNode,
        ...sections.slice(action.index + 1)
      ];
    default:
      return sections;
  }
};

export default sections;
