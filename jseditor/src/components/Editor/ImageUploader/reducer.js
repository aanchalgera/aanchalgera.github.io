import { RECEIVE_IMAGES, OPEN_IMAGEPANEL, OPEN_UPLOADER, CLOSE_DIALOG } from './actions';

const initialState = {
  imageUrls: [],
  openImagePanel: false,
  openAltTextPanel: false,
  openUploader: false,
  selectedImage: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_IMAGES:
      const imageUrls = action.images.map(image => ({
        custom_url: image.custom_url
      }));

      return ({ ...state, imageUrls });

    case OPEN_UPLOADER:
      return ({
        ...state,
        openUploader: true,
        openImagePanel: false
      });

    case OPEN_IMAGEPANEL:
      return ({
        ...state,
        openImagePanel: true,
        openUploader: false
      });

    case CLOSE_DIALOG:
      return ({
        ...state,
        openImagePanel: false,
        openUploader: false,
        openAltTextPanel: false
      });

    default:
      return state;
  }
}
