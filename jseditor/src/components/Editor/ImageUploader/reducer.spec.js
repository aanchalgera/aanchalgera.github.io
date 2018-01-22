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
      modelOpen: '',
      imageToEmbed: {},
      mode: 'add'
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
      modelOpen: '',
      imageToEmbed: {}
    };
    const stateAfter = {
      imageUrls: images,
      modelOpen: '',
      imageToEmbed: {}
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should open image uploader', () => {
    const action = actions.openUploader();
    const stateBefore = {
      imageUrls: [],
      modelOpen: '',
      imageToEmbed: {}
    };
    const stateAfter = {
      imageUrls: [],
      modelOpen: 'imageUploader',
      imageToEmbed: {}
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should open image panel default case', () => {
    const action = actions.openImagePanel();
    const stateBefore = {
      imageUrls: [],
      modelOpen: 'imageUploader',
      imageToEmbed: {},
      mode: 'add'
    };
    const stateAfter = {
      imageUrls: [],
      modelOpen: 'imagePanel',
      imageToEmbed: {},
      mode: 'add'
    };
  });

  it('should open image panel edit case', () => {
    const action = actions.openImagePanel('edit');
    const stateBefore = {
      imageUrls: [],
      modelOpen: 'imageUploader',
      imageToEmbed: {},
      mode: 'add'
    };
    const stateAfter = {
      imageUrls: [],
      modelOpen: 'imagePanel',
      imageToEmbed: {},
      mode: 'edit'
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should open alt panel', () => {
    const image = {
      src: 'https://ti.blogs.es/dfa277/block-size',
      extension: 'jpg',
      height: 400,
      width: 400
    };
    const action = actions.openAltPanel(image);
    const stateBefore = {
      imageUrls: [],
      modelOpen: 'imagePanel',
      imageToEmbed: {}
    };
    const stateAfter = {
      imageUrls: [],
      modelOpen: 'imageAltDialog',
      imageToEmbed: image
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should close the open dialog', () => {
    const action = actions.closeDialog();
    const stateBefore = {
      imageUrls: [],
      modelOpen: 'imagePanel',
      imageToEmbed: {}
    };
    const stateAfter = {
      imageUrls: [],
      modelOpen: '',
      imageToEmbed: {}
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
