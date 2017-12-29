import jquery from 'jquery';
import isoFetch from 'isomorphic-fetch';

import { convertTo1DArray } from './helpers';
import { base } from 'lib/firebase';

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

export const updatePost = async (postname, publishData) => {
  return await base.update('posts/' + postname, {
    data: { publishData }
  });
};

export const savePostFromEscribirPage = state => {
  let firebaseData = {
    id: state.id,
    title: state.title,
    sections: state.fields,
    maxId: state.maxId,
    meta: state.meta,
    postType: state.postType
  };

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
    amp_visibility: Number(state.ampVisibility)
  };
  let postType = 'POST';
  let postUrl = 'postpage';
  if (state.postId !== undefined && state.postId !== '') {
    postType = 'PUT';
    postUrl = 'postpage/' + state.postId;
  }
  return jquery.ajax({
    url: blogUrl + '/admin/' + postUrl,
    type: postType,
    dataType: 'json',
    data: backendData,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true
  });
};

export const submitRepostedBlogsToBackend = async (backendData, blogUrl) => {
  return jquery.ajax({
    url: blogUrl + '/admin/postsrepostings.json',
    type: 'post',
    dataType: 'json',
    data: backendData,
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true
  });
};

export const republishPostNow = async (blogUrl, postId) => {
  return await jquery.ajax({
    url: `${blogUrl}/admin/overlay/republish/${postId}`,
    type: 'POST',
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true
  });
};

export const republishSchedule = async (blogUrl, postId, date) => {
  const republishInterval = 0;
  return await jquery.ajax({
    url: `${blogUrl}/admin/republish/schedule/${postId}`,
    type: 'POST',
    dataType: 'json',
    data: {
      date: date,
      republish_interval: republishInterval
    },
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true
  });
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
