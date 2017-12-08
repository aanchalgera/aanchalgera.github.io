import reducer from './sectionReducer';

import { changeTitle, addImage, changeContent } from 'actions/post';

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
        type: 'content',
        id: 2
      },
      {
        id: 24,
        type: 'image',
        url: 'https://i.blogs.com/id/original.jpg',
        alt: 'Truth can only be found in one place: the code'
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
