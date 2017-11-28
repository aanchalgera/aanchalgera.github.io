import reducer from './postReducer';
import { receivePost, changeTitle } from 'actions/post';

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
      meta: null
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
});
