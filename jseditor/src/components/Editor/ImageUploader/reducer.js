import {
  RECEIVE_IMAGES,
  OPEN_IMAGEPANEL,
  OPEN_UPLOADER,
  OPEN_UPLOADER_WITH_URL,
  CLOSE_DIALOG,
  OPEN_ALT_PANEL
} from './actions';

const initialState = {
  imageUrls: [],
  modelOpen: '',
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
        modelOpen: 'imageUploader'
      };

    case OPEN_UPLOADER_WITH_URL:
      return {
        ...state,
        modelOpen: 'uploaderWithUrl'
      };

    case OPEN_IMAGEPANEL:
      return {
        ...state,
        modelOpen: 'imagePanel',
        mode: action.mode
      };

    case CLOSE_DIALOG:
      return {
        ...state,
        modelOpen: ''
      };

    case OPEN_ALT_PANEL:
      return {
        ...state,
        modelOpen: 'imageAltDialog',
        imageToEmbed: action.image
      };

    default:
      return state;
  }
}
