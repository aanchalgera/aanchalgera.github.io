import {
  RECEIVE_IMAGES,
  OPEN_IMAGEPANEL,
  OPEN_UPLOADER,
  CLOSE_DIALOG,
  OPEN_ALT_PANEL
} from './actions';

const initialState = {
  imageUrls: [],
  isImagePanelOpen: false,
  isAltPanelOpen: false,
  isUploaderOpen: false,
  imageToEmbed: {},
  mode: 'add'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_IMAGES:
      return {
        ...state,
        imageUrls: action.images
      };

    case OPEN_UPLOADER:
      return {
        ...state,
        isUploaderOpen: true,
        isImagePanelOpen: false
      };

    case OPEN_IMAGEPANEL:
      return {
        ...state,
        isImagePanelOpen: true,
        isUploaderOpen: false,
        mode: action.mode
      };

    case CLOSE_DIALOG:
      return {
        ...state,
        isImagePanelOpen: false,
        isUploaderOpen: false,
        isAltPanelOpen: false
      };

    case OPEN_ALT_PANEL:
      return {
        ...state,
        isImagePanelOpen: false,
        isAltPanelOpen: true,
        imageToEmbed: action.image
      };

    default:
      return state;
  }
}
