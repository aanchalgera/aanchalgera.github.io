export const RECEIVE_POST = 'RECEIVE_POST';
export const CHANGE_TITLE = 'CHANGE_TITLE';
export const ADD_SECTION = 'ADD_SECTION';
export const OPEN_IMAGEPANEL = 'OPEN_IMAGEPANEL';
export const CHANGE_CONTENT = 'CHANGE_CONTENT';
export const DELETE_SECTION = 'DELETE_SECTION';
export const EDIT_IMAGE = 'EDIT_IMAGE';
export const CHANGE_CURRENT_INDEX = 'CHANGE_CURRENT_INDEX';

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

export const changeTitle = title => ({
  type: CHANGE_TITLE,
  title
});

export const changeContent = (index, text, position, length) => ({
  type: CHANGE_CONTENT,
  content: {
    text
  },
  index,
  position,
  length
});

export const addImage = (image, position) => {
  image.type = 'image';
  return {
    type: ADD_SECTION,
    section: image,
    position
  };
};

export const openImagePanel = (mode = 'add') => ({
  type: OPEN_IMAGEPANEL,
  mode
});

export const deleteSection = index => ({
  type: DELETE_SECTION,
  index
});

export const editImage = image => ({
  type: EDIT_IMAGE,
  image
});

export const changeCurrentIndex = index => ({
  type: CHANGE_CURRENT_INDEX,
  index
});
