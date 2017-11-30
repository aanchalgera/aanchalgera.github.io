import { RECEIVE_POST, CHANGE_TITLE, ADD_IMAGE } from 'actions/post';
import { access } from 'fs';

const initialState = {};

const sections = (sections, action) => {
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
      const { index } = action.image;
      return [
        ...sections.slice(0, index),
        addImage(action),
        ...sections.slice(index)
      ];
    default:
      return sections;
  }
};

const addImage = action => {
  const { id, url, alt } = action.image;
  return {
    id,
    url,
    type: 'image',
    alt: alt || '',
    banner: false,
    parallax: false,
    align: '',
    layout: 'normal'
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_POST:
      const { post } = action;
      return {
        ...state,
        id: post.id,
        postType: post.postType,
        fields: post.sections || [],
        title: post.title,
        status: post.status,
        userId: post.user_id,
        meta: post.meta || null,
        maxId: post.maxId || 1
      };
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.title,
        fields: sections(state.fields, action)
      };
    case ADD_IMAGE:
      action.image['id'] = state.maxId + 1;
      return {
        ...state,
        maxId: state.maxId + 1,
        fields: sections(state.fields, action)
      };
    default:
      return state;
  }
}
