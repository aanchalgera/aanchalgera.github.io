import reducer from './postReducer';
import { receivePost, changeTitle, addImage } from 'actions/post';

describe('reducer', () => {
  it('should provide the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle receivePost action', () => {
    const stateBefore = {};
    const post = {
      id: 1,
      postType: 'normal',
      sections: [],
      title: '',
      status: 'draft',
      user_id: 1
    };
    const action = receivePost(post);
    const stateAfter = {
      id: 1,
      postType: 'normal',
      fields: [],
      title: '',
      status: 'draft',
      userId: 1,
      meta: null,
      maxId: 1
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle changeTitle action', () => {
    const stateBefore = {
      id: 1,
      postType: 'normal',
      fields: [],
      title: '',
      status: 'draft',
      userId: 1,
      meta: null
    };
    const action = changeTitle('new title');
    const stateAfter = {
      id: 1,
      postType: 'normal',
      fields: [
        {
          id: 0,
          text: 'new title',
          type: 'title'
        }
      ],
      title: 'new title',
      status: 'draft',
      userId: 1,
      meta: null
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle add image action', () => {
    const stateBefore = {
      id: 1,
      postType: 'normal',
      fields: [
        {
          type: 'text',
          id: 2
        },
        {
          type: 'hyperlink',
          id: 2
        }
      ],
      title: '',
      status: 'draft',
      userId: 1,
      meta: null,
      maxId: 23
    };

    const image = {
      url: 'https://i.blogs.com/id/original.jpg',
      alt: 'Truth can only be found in one place: the code',
      index: 1
    };

    const action = addImage(image);

    const stateAfter = {
      id: 1,
      postType: 'normal',
      fields: [
        {
          type: 'text',
          id: 2
        },
        {
          id: 24,
          type: 'image',
          url: 'https://i.blogs.com/id/original.jpg',
          alt: 'Truth can only be found in one place: the code',
          banner: false,
          parallax: false,
          align: '',
          layout: 'normal'
        },
        {
          type: 'hyperlink',
          id: 2
        }
      ],
      title: '',
      status: 'draft',
      userId: 1,
      meta: null,
      maxId: 24
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
