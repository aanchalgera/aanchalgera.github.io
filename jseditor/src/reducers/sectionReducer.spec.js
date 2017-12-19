import reducer from './sectionReducer';

import {
  changeTitle,
  addImage,
  changeContent,
  deleteSection,
  editImage,
  changeAlign
} from 'actions/post';

describe('reducer', () => {
  it('should provide the initial state', () => {
    const initialState = [
      { id: 0, type: 'title' },
      {
        id: 1,
        type: 'content',
        text: ''
      }
    ];
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle changeTitle action', () => {
    const stateBefore = [];
    const action = changeTitle('new title');
    const stateAfter = [
      {
        id: 0,
        text: 'new title',
        type: 'title'
      }
    ];

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle add image action', () => {
    const stateBefore = [
      {
        type: 'content',
        id: 2,
        text: 'abcd \n efgh'
      },
      {
        type: 'hyperlink',
        id: 2
      }
    ];

    const image = {
      url: 'https://i.blogs.com/id/original.jpg',
      alt: 'Truth can only be found in one place: the code',
      index: 0,
      id: 24
    };

    const action = addImage(image);

    const stateAfter = [
      {
        type: 'content',
        id: 25,
        text: 'abcd'
      },
      {
        id: 24,
        type: 'image',
        url: 'https://i.blogs.com/id/original.jpg',
        alt: 'Truth can only be found in one place: the code'
      },
      {
        type: 'content',
        id: 26,
        text: ' efgh'
      },
      {
        type: 'hyperlink',
        id: 2
      }
    ];

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle change content action', () => {
    const stateBefore = [
      {
        type: 'image',
        id: 1
      },
      {
        type: 'content',
        id: 2,
        text: 'abc'
      }
    ];

    const action = changeContent(1, 'abcd');

    const stateAfter = [
      {
        type: 'image',
        id: 1
      },
      {
        type: 'content',
        id: 2,
        text: 'abcd'
      }
    ];

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle delete section action', () => {
    const stateBefore = [
      {
        id: 1,
        type: 'title',
        text: 'No if no but, only jatt'
      },
      {
        id: 2,
        type: 'image',
        url: 'https://i.blogs.com/id/original.jpg',
        alt: 'Truth can only be found in one place: the code'
      },
      {
        id: 3,
        type: 'content',
        text: 'test'
      },
      {
        id: 4,
        type: 'image',
        url: 'https://i.blogs.com/id/original.jpg',
        alt: 'sample alt'
      }
    ];

    const index = 3;
    const action = deleteSection(index);

    const stateAfter = [
      {
        id: 1,
        type: 'title',
        text: 'No if no but, only jatt'
      },
      {
        id: 2,
        type: 'image',
        url: 'https://i.blogs.com/id/original.jpg',
        alt: 'Truth can only be found in one place: the code'
      },
      {
        id: 3,
        type: 'content',
        text: 'test'
      }
    ];

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle edit image action', () => {
    const stateBefore = [
      {
        type: 'content',
        id: 2
      },
      {
        id: 24,
        type: 'image',
        src: 'https://i.blogs.com/id222',
        alt: 'Test Text',
        extension: '.jpg',
        height: '200',
        width: '300'
      },
      {
        type: 'content',
        id: 25,
        text: ''
      },
      {
        type: 'hyperlink',
        id: 2
      }
    ];

    const image = {
      src: 'https://i.blogs.com/id',
      extension: '.jpg',
      height: '200',
      width: '300',
      alt: 'Truth can only be found in one place: the code',
      index: 1,
      id: 24
    };

    const action = editImage(image);

    const stateAfter = [
      {
        type: 'content',
        id: 2
      },
      {
        id: 24,
        type: 'image',
        src: 'https://i.blogs.com/id',
        alt: 'Truth can only be found in one place: the code',
        extension: '.jpg',
        height: '200',
        width: '300'
      },
      {
        type: 'content',
        id: 25,
        text: ''
      },
      {
        type: 'hyperlink',
        id: 2
      }
    ];

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('it should change the align of given node', () => {
    const stateBefore = [
      {
        id: 1,
        type: 'title',
        text: 'No if no but, only jatt'
      },
      {
        id: 2,
        type: 'image',
        url: 'https://i.blogs.com/id/original.jpg',
        alt: 'Truth can only be found in one place: the code'
      },
      {
        id: 3,
        type: 'content',
        text: 'test'
      },
      {
        id: 4,
        type: 'image',
        url: 'https://i.blogs.com/id/original.jpg',
        alt: 'sample alt'
      }
    ];

    const index = 1;
    const align = 'right';
    const action = changeAlign(index, align);

    const stateAfter = [
      {
        id: 1,
        type: 'title',
        text: 'No if no but, only jatt'
      },
      {
        id: 2,
        type: 'image',
        url: 'https://i.blogs.com/id/original.jpg',
        alt: 'Truth can only be found in one place: the code',
        align: 'right'
      },
      {
        id: 3,
        type: 'content',
        text: 'test'
      },
      {
        id: 4,
        type: 'image',
        url: 'https://i.blogs.com/id/original.jpg',
        alt: 'sample alt'
      }
    ];
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
