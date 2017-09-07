import jquery from 'jquery';
import isoFetch from 'isomorphic-fetch';

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
  let imageValidated = {
    square: { ...state.crop.square },
    golden: { ...state.crop.golden },
    panoramic: { ...state.crop.panoramic }
  };

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
      postDate: state.publishedDate,
      publishRegion: state.publishRegion,
      postRepostBlogNames: state.postRepostBlogNames,
      postId: state.postId,
      postHash: state.postHash
    },
    imageValidated: imageValidated,
    crop: state.crop,
    tags: state.tags,
    category: state.category,
    otherCategories: state.otherCategories
  };

  base.update('posts/' + state.id, {
    data: firebaseData
  });
};

export const savePostsList = (state, base, blogName) => {
  let blogStatus = `${blogName}_${state.status}`;
  let listData = {
    id: state.id,
    title: state.title,
    status: state.status,
    user_id: state.userId,
    blog_name: blogName,
    user_status: `${blogName}_${state.userId}_${state.status}`,
    blog_status: blogStatus,
    blog_post_type: `${blogStatus}_${postType}`
  };

  base.post(`posts_list/${state.id}`, {
    data: listData,
    then() {}
  });
};

export const submitPostToBackend = (state, date, blogUrl) => {
  let publishRegion = state.publishRegion;
  let postRepostBlogNames = state.postRepostBlogNames;
  let imageValidated = {
    square: { ...state.crop.square },
    golden: { ...state.crop.golden },
    panoramic: { ...state.crop.panoramic }
  };

  for (let key in imageValidated) {
    delete imageValidated[key]['validate'];
  }
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
    postDate: date,
    'publish-region': publishRegion,
    postRepostBlogNames: postRepostBlogNames,
    firebase_id: state.id,
    post_status: 'future',
    user_id: state.userId,
    primary_image: state.meta.homepage.image.url,
    is_sensitive: state.isSensitive,
    long_post: state.specialPost,
    image_validated: imageValidated
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
