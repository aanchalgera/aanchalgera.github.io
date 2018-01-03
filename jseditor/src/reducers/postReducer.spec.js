import reducer from './postReducer';
import {
  receivePost,
  addImage,
  changeCurrentIndex,
  deleteSection,
  changeTitle
} from 'actions/post';
import { initialPublishRegions, initialMeta } from 'lib/constants';

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
      meta: initialMeta,
      maxId: 2,
      category: -1,
      publishRegion: initialPublishRegions,
      commentStatus: 'open',
      isSensitive: false,
      postCategories: [],
      postId: '',
      primaryImage: '',
      publishedDate: '03/01/2018 8:00',
      tags: []
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
      maxId: 25,
      isAtFirstPosition: false
    };

    const image = {
      id: 22,
      url: 'i.blogs.es/927bfp/original.jpeg',
      alt: 'Talk is cheap. Show me the code.'
    };

    const action = addImage(image);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle changeCurrentIndex action', () => {
    const stateBefore = {
      id: 1,
      postType: 'normal',
      title: '',
      status: 'draft',
      userId: 1,
      meta: null,
      maxId: 2,
      currentIndex: 2
    };
    const newIndex = 3;
    const action = changeCurrentIndex(newIndex);
    const stateAfter = {
      id: 1,
      postType: 'normal',
      title: '',
      status: 'draft',
      userId: 1,
      meta: null,
      maxId: 2,
      currentIndex: 3,
      isAtFirstPosition: false
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle delete section action', () => {
    const stateBefore = {
      id: 1,
      postType: 'normal',
      title: '',
      status: 'draft',
      userId: 1,
      meta: null,
      maxId: 2,
      currentIndex: 2
    };

    const index = 2;
    const maxId = 2;
    const action = deleteSection(index, maxId);

    const stateAfter = {
      id: 1,
      postType: 'normal',
      title: '',
      status: 'draft',
      userId: 1,
      meta: null,
      maxId: 3,
      currentIndex: 2
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle change title action', () => {
    const stateBefore = {
      id: 1,
      postType: 'normal',
      title: 'test title',
      status: 'draft',
      userId: 1,
      meta: {
        social: {
          twitter: 'test title',
          facebook: ''
        }
      },
      maxId: 2,
      currentIndex: 2
    };

    const newTitle = 'New title';
    const action = changeTitle(newTitle);

    const stateAfter = {
      id: 1,
      postType: 'normal',
      title: 'New title',
      status: 'draft',
      userId: 1,
      meta: {
        social: {
          twitter: 'New title',
          facebook: ''
        }
      },
      maxId: 2,
      currentIndex: 2
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
