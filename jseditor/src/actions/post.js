export const RECEIVE_POST = 'RECEIVE_POST';
export const CHANGE_TITLE = 'CHANGE_TITLE';
export const ADD_SECTION = 'ADD_SECTION';
export const OPEN_IMAGEPANEL = 'OPEN_IMAGEPANEL';
export const CHANGE_CONTENT = 'CHANGE_CONTENT';
export const DELETE_SECTION = 'DELETE_SECTION';

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

export function changeContent(index, text) {
  return {
    type: CHANGE_CONTENT,
    content: {
      text,
      index
    }
  };
}

export function addImage(image) {
  image.type = 'image';
  return {
    type: ADD_SECTION,
    section: image
  };
}

export function openImagePanel() {
  return {
    type: OPEN_IMAGEPANEL
  };
}

export function deleteSection(index) {
  return {
    type: DELETE_SECTION,
    index
  };
}
