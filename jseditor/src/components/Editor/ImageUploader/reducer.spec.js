import reducer from './reducer';
import * as actions from './actions';

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
    const initialState = {
      imageUrls: [],
      isImagePanelOpen: false,
      isAltPanelOpen: false,
      isUploaderOpen: false,
      imageToEmbed: ''
    };

    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should return images', () => {
    const images = [
      { url: 'https://ti.blogs.es/dfa277/block-size/image_dimension.jpg' },
      { url: 'https://ti.blogs.es/5281c5/emo/image_dimension.gif' },
      { url: 'https://ti.blogs.es/34589a/wallfon/image_dimension.jpg' }
    ];
    const action = actions.receiveImages(images);
    const stateBefore = {
      imageUrls: [],
      isImagePanelOpen: false,
      isAltPanelOpen: false,
      isUploaderOpen: false,
      imageToEmbed: ''
    };
    const stateAfter = {
      imageUrls: images,
      isImagePanelOpen: false,
      isAltPanelOpen: false,
      isUploaderOpen: false,
      imageToEmbed: '' 
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should open image uploader', () => {
    const action = actions.openUploader();
    const stateBefore = {
      imageUrls: [],
      isImagePanelOpen: true,
      isAltPanelOpen: false,
      isUploaderOpen: false,
      imageToEmbed: ''
    };
    const stateAfter = {
      imageUrls: [],
      isImagePanelOpen: false,
      isAltPanelOpen: false,
      isUploaderOpen: true,
      imageToEmbed: '',
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should open image panel', () => {
    const action = actions.openImagePanel();
    const stateBefore = {
      imageUrls: [],
      isImagePanelOpen: false,
      isAltPanelOpen: false,
      isUploaderOpen: true,
      imageToEmbed: ''
    };
    const stateAfter = {
      imageUrls: [],
      isImagePanelOpen: true,
      isAltPanelOpen: false,
      isUploaderOpen: false,
      imageToEmbed: ''
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should open alt panel', () => {
    const image = 'https://ti.blogs.es/dfa277/block-size/original.jpg';
    const action = actions.openAltPanel(image);
    const stateBefore = {
      imageUrls: [],
      isImagePanelOpen: true,
      isAltPanelOpen: false,
      isUploaderOpen: false,
      imageToEmbed: ''
    };
    const stateAfter = {
      imageUrls: [],
      isImagePanelOpen: false,
      isAltPanelOpen: true,
      isUploaderOpen: false,
      imageToEmbed: image
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should close the image panel', () => {
    const action = actions.closeDialog();
    const stateBefore = {
      imageUrls: [],
      isImagePanelOpen: true,
      isAltPanelOpen: false,
      isUploaderOpen: false,
      imageToEmbed: ''
    };
    const stateAfter = {
      imageUrls: [],
      isImagePanelOpen: false,
      isAltPanelOpen: false,
      isUploaderOpen: false,
      imageToEmbed: ''
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should close the alt panel', () => {
    const action = actions.closeDialog();
    const stateBefore = {
      imageUrls: [],
      isImagePanelOpen: false,
      isAltPanelOpen: true,
      isUploaderOpen: false,
      imageToEmbed: ''
    };
    const stateAfter = {
      imageUrls: [],
      isImagePanelOpen: false,
      isAltPanelOpen: false,
      isUploaderOpen: false,
      imageToEmbed: ''
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should close the image uploader', () => {
    const action = actions.closeDialog();
    const stateBefore = {
      imageUrls: [],
      isImagePanelOpen: false,
      isAltPanelOpen: false,
      isUploaderOpen: true,
      imageToEmbed: ''
    };
    const stateAfter = {
      imageUrls: [],
      isImagePanelOpen: false,
      isAltPanelOpen: false,
      isUploaderOpen: false,
      imageToEmbed: ''
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
