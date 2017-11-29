import { RECEIVE_POST, CHANGE_TITLE } from 'actions/post';

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
    default:
      return sections;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_POST:
      const { post } = action;
      return Object.assign({}, state, {
        id: post.id,
        postType: post.postType,
        fields: post.sections || [],
        title: post.title,
        status: post.status,
        userId: post.user_id,
        meta: post.meta || null,
        maxId: post.maxId || 1
      });
    case CHANGE_TITLE:
      return Object.assign({}, state, {
        title: action.title,
        fields: sections(state.fields, action)
      });
    default:
      return state;
  }
}
