import { IMAGES_RECEIVE, IMAGEPANEL_OPEN, UPLOADER_OPEN, DIALOG_CLOSE } from './actions';

const initialState = {
  imageUrls: [],
  openImagePanel: false,
  openAltTextPanel: false,
  openUploader: false,
  selectedImage: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IMAGES_RECEIVE:
      const imageUrls = action.images.map((image, index) => ({
        url: image.url,
        thumbnail_url: image.thumbnail_url
      }));

      return Object.assign({}, state, { imageUrls });

    case UPLOADER_OPEN:
      return Object.assign({}, state, {
        openUploader: true,
        openImagePanel: false,
        openAltTextPanel: false
      });

    case IMAGEPANEL_OPEN:
      return Object.assign({}, state, {
        openImagePanel: true,
        openUploader: false,
        openAltTextPanel: false
      });

    case DIALOG_CLOSE:
      return Object.assign({}, state, {
        openImagePanel: false,
        openUploader: false,
        openAltTextPanel: false
      });

    default:
      return state;
  }
}
