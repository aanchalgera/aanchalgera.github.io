import jquery from 'jquery';
import isoFetch from 'isomorphic-fetch';

import { convertTo1DArray } from './helpers';

export const getConfig = (blogName, base) => {
  return base.fetch('config', {
    context: this,
    asArray: true,
    queries: {
      orderByChild: 'site_name',
      equalTo: blogName
    }
  });
};

export const getPost = (postname, base) => {
  return base.fetch('posts/' + postname, {
    context: this
  });
};

export const updatePost = async (postname, base, publishData) => {
  return await base.update('posts/' + postname, {
    data: { publishData }
  });
};

export const savePost = (state, base) => {
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
    postCategories: state.postCategories
  };

  base.update('posts/' + state.id, {
    data: firebaseData
  });
};

export const savePostsList = (state, base, blogName) => {
  let blogStatus = blogName + '_publish';
  let listData = {
    id: state.id,
    title: state.title,
    status: 'publish',
    user_id: state.userId,
    blog_name: blogName,
    user_status: blogName + '_' + state.userId + '_publish',
    blog_status: blogStatus,
    blog_post_type: `${blogStatus}_${state.postType}`
  };

  base.post('posts_list/' + state.id, {
    data: listData
  });
};

export const submitPostToBackend = (state, blogUrl) => {
  let publishRegion = state.publishRegion;
  let postRepostBlogNames = state.postRepostBlogNames;
  let backendData = {
    categoryId: state.category,
    post_title: state.title,
    comment_status: state.meta.comment.status,
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
    post_categories: convertTo1DArray(state.postCategories),
    tags: convertTo1DArray(state.tags),
    postRepostBlogNames: postRepostBlogNames,
    firebase_id: state.id,
    post_status: 'future',
    user_id: state.userId,
    primary_image: state.meta.homepage.image.url,
    is_sensitive: state.isSensitive,
    long_post: state.specialPost,
    image_validated: state.crop
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

export const loadAllCategories = async (blogUrl, postType) => {
  let response = await isoFetch(`${blogUrl}/admin/api/categories/${postType}`, {
    credentials: 'include'
  });
  let categories = response.json();
  return categories;
};

export const submitRepostedBlogsToBackend = async (backendData, blogUrl) => {
  return await jquery.ajax({
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

export const getUserDetails = async (blogUrl, userId) => {
  const response = await isoFetch(`${blogUrl}/admin/users/${userId}.json`, {
    credentials: 'include'
  });
  const userDetails = response.json();
  return userDetails;
};
