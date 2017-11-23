import { REQUEST_IMAGES } from './actions';

const initialState = {
  imageUrls: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_IMAGES:
      const imageUrls = action.images.map((image, index) => ({
        url: image.url,
        thumbnail_url: image.thumbnail_url
      }));

      return Object.assign({}, state, { imageUrls });

    default:
      return state;
  }
}
