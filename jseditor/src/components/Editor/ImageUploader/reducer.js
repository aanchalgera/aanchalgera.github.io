import { RECEIVE_IMAGES, OPEN_IMAGEPANEL, OPEN_UPLOADER, CLOSE_DIALOG } from './actions';

const initialState = {
  imageUrls: [],
  isImagePanelOpen: false,
  isAltPanelOpen: false,
  isUploaderOpen: false,
  selectedImage: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_IMAGES:
      const imageUrls = action.images.map(image => ({
        url: image.url
      }));

      return ({ ...state, imageUrls });

    case OPEN_UPLOADER:
      return ({
        ...state,
        isUploaderOpen: true,
        isImagePanelOpen: false
      });

    case OPEN_IMAGEPANEL:
      return ({
        ...state,
        isImagePanelOpen: true,
        isUploaderOpen: false
      });

    case CLOSE_DIALOG:
      return ({
        ...state,
        isImagePanelOpen: false,
        isUploaderOpen: false,
        isAltPanelOpen: false
      });

    default:
      return state;
  }
}
