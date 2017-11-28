export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_TITLE = 'RECEIVE_TITLE';

export function receivePost(post) {
  return {
    type: RECEIVE_POST,
    post: post
  };
}

export function receiveTitle(title) {
  return {
    type: RECEIVE_TITLE,
    tile: title
  };
}
