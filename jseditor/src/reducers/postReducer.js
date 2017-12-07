import { RECEIVE_POST, ADD_SECTION } from 'actions/post';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_POST:
      const { post } = action;
      return {
        ...state,
        id: post.id,
        postType: post.postType,
        title: post.title,
        status: post.status,
        userId: post.user_id,
        meta: post.meta || null,
        maxId: post.maxId || 1
      };
    case ADD_SECTION:
      return {
        ...state,
        maxId: state.maxId + 2
      };
    default:
      return state;
  }
}
