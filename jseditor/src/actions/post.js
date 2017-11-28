export const RECEIVE_POST = 'RECEIVE_POST';
export const CHANGE_TITLE = 'CHANGE_TITLE';

export function receivePost(post) {
  return {
    type: RECEIVE_POST,
    post: post
  };
}

export function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    tile: title
  };
}
