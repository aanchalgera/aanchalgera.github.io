import reducer from './postReducer';
import { receivePost, addImage } from 'actions/post';

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
      title: '',
      status: 'draft',
      userId: 1,
      meta: null,
      maxId: 1
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle addImage action', () => {
    const stateBefore = {
      id: 1,
      postType: 'normal',
      title: '',
      status: 'draft',
      maxId: 22
    };

    const stateAfter = {
      id: 1,
      postType: 'normal',
      title: '',
      status: 'draft',
      maxId: 23
    };

    const image = {
      id: 22,
      url: 'i.blogs.es/927bfp/original.jpeg',
      alt: 'Talk is cheap. Show me the code.'
    };

    const action = addImage(image);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
