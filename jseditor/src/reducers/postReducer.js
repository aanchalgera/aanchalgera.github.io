import {
  RECEIVE_POST,
  ADD_SECTION,
  CHANGE_POSITION,
  CHANGE_CURRENT_INDEX,
  CHANGE_TITLE
} from 'actions/post';

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
        maxId: post.maxId || 2
      };
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.title
      };
    case ADD_SECTION:
      return {
        ...state,
        maxId: state.maxId + 3
      };
    case CHANGE_POSITION:
      return {
        ...state,
        currentIndex: action.index,
        splitPosition: action.splitPosition,
        coordinates: action.coordinates,
        isAtFirstPosition: action.isAtFirstPosition
      };
    case CHANGE_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.index,
        isAtFirstPosition: false
      };
    default:
      return state;
  }
}
