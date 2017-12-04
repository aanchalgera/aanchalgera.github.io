import reducer from './sectionReducer';

import { changeTitle, addImage } from 'actions/post';

describe('reducer', () => {
  it('should provide the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
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
        type: 'text',
        id: 2
      },
      {
        type: 'hyperlink',
        id: 2
      }
    ];

    const image = {
      url: 'https://i.blogs.com/id/original.jpg',
      alt: 'Truth can only be found in one place: the code',
      index: 1,
      id: 24
    };

    const action = addImage(image);

    const stateAfter = [
      {
        type: 'text',
        id: 2
      },
      {
        id: 24,
        type: 'image',
        url: 'https://i.blogs.com/id/original.jpg',
        alt: 'Truth can only be found in one place: the code'
      },
      {
        type: 'hyperlink',
        id: 2
      }
    ];

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
