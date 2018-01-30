import { Image } from 'lib/flowTypes';

export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const OPEN_IMAGEPANEL = 'OPEN_IMAGEPANEL';
export const OPEN_UPLOADER = 'OPEN_UPLOADER';
export const OPEN_UPLOADER_WITH_URL = 'OPEN_UPLOADER_WITH_URL';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';
export const OPEN_ALT_PANEL = 'OPEN_ALT_PANEL';

export const receiveImages = images => ({
  type: RECEIVE_IMAGES,
  images
});

export const closeDialog = () => ({
  type: CLOSE_DIALOG
});

export const openUploader = () => ({
  type: OPEN_UPLOADER
});

export const openUploaderWithUrl = () => ({
  type: OPEN_UPLOADER_WITH_URL
});

export const openImagePanel = (mode = 'add') => ({
  type: OPEN_IMAGEPANEL,
  mode
});

export const openAltPanel = (image: Image) => ({
  type: OPEN_ALT_PANEL,
  image
});
