import reducer from './reducer';
import * as actions from './actions';

const initialState = {
  imageUrls: [],
  isImagePanelOpen: false,
  isAltPanelOpen: false,
  isUploaderOpen: false,
  imageToEmbed: ''
};

describe('actions', () => {
  it('should create an action to receive images', () => {
    const images = [
      { url: 'https://ti.blogs.es/dfa277/block-size/image_dimension.jpg' },
      { url: 'https://ti.blogs.es/5281c5/emo/image_dimension.gif' },
      { url: 'https://ti.blogs.es/34589a/wallfon/image_dimension.jpg' }
    ];
    const expectedAction = {
      type: actions.RECEIVE_IMAGES,
      images
    };

    expect(actions.receiveImages(images)).toEqual(expectedAction);
  });

  it('should create an action to open Alt panel', () => {
    const image = 'https://ti.blogs.es/dfa277/block-size/original.jpg';
    const expectedAction = {
      type: actions.OPEN_ALT_PANEL,
      image
    };

    expect(actions.openAltPanel(image)).toEqual(expectedAction);
  });
});

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return images', () => {
    const images = [
      { url: 'https://ti.blogs.es/dfa277/block-size/image_dimension.jpg' },
      { url: 'https://ti.blogs.es/5281c5/emo/image_dimension.gif' },
      { url: 'https://ti.blogs.es/34589a/wallfon/image_dimension.jpg' }
    ];
    const action = {
      type: actions.RECEIVE_IMAGES,
      images
    };
    const expectedState = { ...initialState, imageUrls: images };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should open image uploader', () => {
    const state = { ...initialState, isImagePanelOpen: true };
    const expectedState = { ...initialState, isUploaderOpen: true };

    expect(reducer(state, { type: actions.OPEN_UPLOADER })).toEqual(expectedState);
  });

  it('should open image panel', () => {
    const state = { ...initialState, isUploaderOpen: true };
    const expectedState = { ...initialState, isImagePanelOpen: true };

    expect(reducer(state, { type: actions.OPEN_IMAGEPANEL })).toEqual(expectedState);
  });

  it('should open alt panel', () => {
    const image = 'https://ti.blogs.es/dfa277/block-size/original.jpg';
    const action = {
      type: actions.OPEN_ALT_PANEL,
      image
    };
    const state = { ...initialState, isImagePanelOpen: true };
    const expectedState = {
      ...initialState,
      isImagePanelOpen: false,
      isAltPanelOpen: true,
      imageToEmbed: image
    };

    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should close the image panel', () => {
    const state = { ...initialState, isImagePanelOpen: true };

    expect(reducer(state, { type: actions.CLOSE_DIALOG })).toEqual(initialState);
  });

  it('should close the alt panel', () => {
    const state = { ...initialState, isAltPanelOpen: true };

    expect(reducer(state, { type: actions.CLOSE_DIALOG })).toEqual(initialState);
  });

  it('should close the image uploader', () => {
    const state = { ...initialState, isUploaderOpen: true };

    expect(reducer(state, { type: actions.CLOSE_DIALOG })).toEqual(initialState);
  });
});
