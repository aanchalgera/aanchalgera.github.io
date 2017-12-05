export const RECEIVE_POST = 'RECEIVE_POST';
export const CHANGE_TITLE = 'CHANGE_TITLE';
export const ADD_IMAGE = 'ADD_IMAGE';
export const OPEN_IMAGEPANEL = 'OPEN_IMAGEPANEL';

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

export function addImage(image) {
  return {
    type: ADD_IMAGE,
    image: image
  };
}

export function openImagePanel() {
  return {
    type: OPEN_IMAGEPANEL
  };
}
