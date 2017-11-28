import { RECEIVE_POST, RECEIVE_TITLE } from 'actions/post';

const initialState = {
  post: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_POST:
      const post = action.post;

      return Object.assign({}, state, {
        id: post.id,
        postType: post.postType,
        fields: post.sections || [],
        title: post.title,
        status: post.status,
        userId: post.user_id,
        meta: post.meta || null
      });
    case RECEIVE_TITLE:
      const title = action.title;
      return Object.assign({}, state, {
        title: action.title
      });
    default:
      return state;
  }
}
