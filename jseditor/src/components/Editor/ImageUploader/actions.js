export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const OPEN_IMAGEPANEL = 'OPEN_IMAGEPANEL';
export const OPEN_UPLOADER = 'OPEN_UPLOADER';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

export const receiveImages = images => ({
  type: RECEIVE_IMAGES,
  images
});

export const closeDialog = () => ({
  type: CLOSE_DIALOG,
});

export const openUploader = () => ({
  type: OPEN_UPLOADER,
});

export const openImagePanel = () => ({
  type: OPEN_IMAGEPANEL,
});
