import { base } from 'lib/firebase';
import isoFetch from 'isomorphic-fetch';

import { convertTo1DArray, queryBuilder } from './helpers';

export const saveInitialPost = initialData => {
  base.post('posts/' + initialData.id, {
    data: initialData
  });
};

export const getBlogUrl = async blogName => {
  try {
    const data = await base.fetch('config', {
      context: this,
      asArray: true,
      queries: {
        orderByChild: 'site_name',
        equalTo: blogName
      }
    });
    return data[0].site_url;
  } catch (error) {
    throw new Error('Blog not found in Config');
  }
};

export const getPost = postname => {
  return base.fetch('posts/' + postname, {
    context: this
  });
};

export const listenToPost = (postname, receivePost) => {
  return base.listenTo('posts/' + postname, {
    context: this,
    then(post) {
      receivePost(post);
    }
  });
};

export const updatePost = async (postname, publishData) => {
  return await base.update('posts/' + postname + '/publishData', {
    data: { ...publishData }
  });
};

export const savePostFromEscribirPage = (state, publishData) => {
  let firebaseData = {
    id: state.id,
    title: state.title,
    sections: state.fields,
    maxId: state.maxId,
    meta: state.meta,
    postType: state.postType
  };
  if (publishData) {
    firebaseData.publishData = {
      postId: publishData.id,
      postHash: publishData.post_hash
    };
  }
  base.update('posts/' + state.id, {
    data: firebaseData
  });
};

export const savePost = state => {
  let firebaseData = {
    id: state.id,
    title: state.title,
    sections: state.fields,
    maxId: state.maxId,
    blogName: state.blogName,
    meta: state.meta,
    status: state.status,
    user_id: state.userId,
    isSensitive: state.isSensitive,
    specialPost: state.specialPost,
    publishData: {
      postDate: state.publishedDate || null,
      publishRegion: state.publishRegion,
      postRepostBlogNames: state.postRepostBlogNames,
      postId: state.postId,
      postHash: state.postHash
    },
    crop: state.crop,
    tags: state.tags,
    category: state.category,
    postCategories: state.postCategories,
    ampVisibility: state.ampVisibility,
    iaVisibility: state.iaVisibility,
    commentStatus: state.commentStatus
  };

  base.update('posts/' + state.id, {
    data: firebaseData
  });
};

export const savePostsList = (state, blogName) => {
  if (state.postType === 'longform' || state.postType === 'brandedLongform') {
    let blogStatus = blogName + '_' + state.status;
    let listData = {
      id: state.id,
      title: state.title || 'Título...',
      status: state.status,
      user_id: state.userId,
      blog_name: blogName,
      user_status: blogName + '_' + state.userId + '_' + state.status,
      blog_status: blogStatus,
      blog_post_type: blogStatus + '_' + mapPostType(state.postType)
    };

    base.post('posts_list/' + state.id, {
      data: listData
    });
  }
};

export const mapPostType = postType => {
  const normalTypes = ['normal', 'longform'];
  return normalTypes.includes(postType) ? 'normal' : 'club';
};

export const submitPostToBackend = (state, blogUrl) => {
  let publishRegion = state.publishRegion;
  let backendData = {
    categoryId: state.category,
    post_title: state.title,
    comment_status: state.commentStatus,
    post_type: state.postType,
    post_content: JSON.stringify(state.fields),
    postExcerpt: JSON.stringify({ meta: state.meta }),
    post_abstract: '',
    post_extended_title: '',
    post_visibility: 0,
    posts_galleries: '',
    post_subtype: 13,
    postDate: state.publishedDate,
    'publish-region': publishRegion,
    postCategories: convertTo1DArray(state.postCategories),
    tags: convertTo1DArray(state.tags),
    firebase_id: state.id,
    post_status: state.status,
    user_id: state.userId,
    primary_image: state.primaryImage,
    is_sensitive: state.isSensitive,
    long_post: Number(state.specialPost),
    image_validated: state.crop,
    ia_visibility: Number(state.iaVisibility),
    amp_visibility: Number(state.ampVisibility),
    seo_description: state.meta.seo.description,
    seo_title: state.meta.seo.title
  };
  let method = 'POST';
  let postUrl = 'postpage';
  if (state.postId !== undefined && state.postId !== '') {
    method = 'PUT';
    postUrl = 'postpage/' + state.postId;
  }
  const url = `${blogUrl}/admin/${postUrl}`;

  return submitRequest(url, backendData, method);
};

export const submitRepostedBlogsToBackend = (backendData, blogUrl) => {
  const url = `${blogUrl}/admin/postsrepostings.json`;

  return submitRequest(url, backendData);
};

export const republishPostNow = (blogUrl, postId) => {
  const url = `${blogUrl}/admin/overlay/republish/${postId}`;
  const params = {
    credentials: 'include',
    method: 'POST',
    headers: {
      Accept: 'text/html',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
  };

  return isoFetch(url, params);
};

export const republishSchedule = (blogUrl, postId, date) => {
  const backendData = {
    date: date,
    republish_interval: 0
  };
  const url = `${blogUrl}/admin/republish/schedule/${postId}`;

  return submitRequest(url, backendData);
};

export const getUserDetails = async blogUrl => {
  try {
    const response = await isoFetch(`${blogUrl}/admin/users/currentUser.json`, {
      credentials: 'include'
    });
    return response.json();
  } catch (err) {
    throw new Error('NOT_LOGGED_IN');
  }
};

const submitRequest = async (url, backendData, method = 'POST') => {
  const params = {
    credentials: 'include',
    method: method,
    headers: {
      Accept: 'application/json, text/javascript, */*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body: queryBuilder(backendData)
  };

  return await isoFetch(url, params).then(res => res.json());
};
