import { SET_IMAGES } from './actions';

const initialState = {
  imageUrls: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_IMAGES:
      const imageUrls = action.images.map((image, index) => ({
        id: index,
        url: image.url
      }));

      return Object.assign({}, state, { imageUrls });

    default:
      return state;
  }
}
