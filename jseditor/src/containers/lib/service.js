import jquery from 'jquery';

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
    status: 'publish',
    meta: state.meta,
    user_id: state.userId,
    crop: state.crop,
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
    tags: state.tags,
    category: state.category
  };

  base.post('posts/' + state.id, {
    data: firebaseData
  });
};

export const savePostsList = (state, base, blogName) => {
  let blogStatus = blogName + '_publish';
  let postType = 'normal';
  if (state.meta.sponsor.image) {
    postType = 'club';
  }
  let listData = {
    id: state.id,
    title: state.title,
    status: 'publish',
    user_id: state.userId,
    blog_name: blogName,
    user_status: blogName + '_' + state.userId + '_publish',
    blog_status: blogStatus,
    blog_post_type: blogStatus + '_' + postType
  };

  base.post('posts_list/' + state.id, {
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
    post_type: 'normal',
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
