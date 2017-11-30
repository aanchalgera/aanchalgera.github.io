export const RECEIVE_POST = 'RECEIVE_POST';
export const CHANGE_TITLE = 'CHANGE_TITLE';
export const ADD_IMAGE = 'ADD_IMAGE';

export function receivePost(post) {
  return {
    type: RECEIVE_POST,
    post
  };
}

export function changeTitle(title) {
  return {
    type: CHANGE_TITLE,
    title
  };
}

export function addImage(id, image) {
  image.id = id;
  return {
    type: ADD_IMAGE,
    image
  };
}
