import idx from 'idx';

import { currentTime } from 'containers/lib/momentHelper';
import {
  defaultCommentStatus,
  initialPublishRegions,
  initialMeta
} from 'lib/constants';
import {
  RECEIVE_POST,
  ADD_SECTION,
  CHANGE_POSITION,
  CHANGE_CURRENT_INDEX,
  CHANGE_TITLE,
  DELETE_SECTION
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
        meta: post.meta || initialMeta,
        postCategories: post.postCategories || [],
        category: post.category || -1,
        tags: post.tags || [],
        publishedDate:
          post.status === 'draft' ? currentTime() : post.publishData.postDate,
        isSensitive: post.isSensitive || false,
        commentStatus:
          post.commentStatus || defaultCommentStatus[post.postType],
        postId: idx(post, _ => _.publishData.postId) || '',
        primaryImage: '',
        publishRegion:
          idx(post, _ => _.publishData.publishRegion) || initialPublishRegions,
        maxId: post.maxId || 2
      };
    case CHANGE_TITLE:
      let social = state.meta.social;

      if (state.title === social.twitter) {
        social = { ...social, twitter: action.title };
      }

      return {
        ...state,
        title: action.title,
        meta: { ...state.meta, social }
      };
    case ADD_SECTION:
      return {
        ...state,
        maxId: state.maxId + 3,
        isAtFirstPosition: false
      };
    case DELETE_SECTION:
      return {
        ...state,
        maxId: state.maxId + 1
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
