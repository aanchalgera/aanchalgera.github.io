import idx from 'idx';
import moment from 'moment-timezone';
import configParams from '../../config/configs.js';

moment.tz.setDefault(configParams.timezone);

const PUBLISH_POST_WARNING = 'You can not reschedule already published post';
const IMAGE_CROP_WARNING =
  'Es necesario validar los recortes de las imágenes para poder publicar';
const TWITTER_FIELD_EMPTY = 'Twitter text field cannot be empty';
const FACEBOOK_FIELD_EMPTY = 'Facebook text field cannot be empty';
const FACEBOOK_TEXT_SAME_POST_TITLE =
  'Facebook text cannot be same as post title';
const CATEGORY_FIELD_EMPTY = 'Category cannot be empty';
const INVALID_DATE = 'Past date selected';
const WRONG_LOGO_IMAGE_ADDRESS = 'incorrecto dirección del logotipo';
const EMPTY_COUNTRY_ARRAY = 'Por favor seleccione un país';
const TRACKER_EMPTY = 'URL Tracker can not be empty';
const SPONSOR_NAME_EMPTY = 'nombre del cliente no puede estar vacío';
const TAG_FIELD_EMPTY = 'El campo de etiqueta no puede estar vacío';

export const loadStatefromData = (data: {}) => {
  return {
    id: data.id,
    blogName: data.blogName,
    fields: data.sections || [],
    title: data.title,
    postType: data.postType,
    commentStatus: data.commentStatus || data.meta.comment.status || 'closed',
    meta: data.meta,
    maxId: data.maxId,
    status: data.status || 'draft',
    publishedDate: idx(data, _ => _.publishData.postDate),
    postRepostBlogNames:
      idx(data, _ => _.publishData.postRepostBlogNames) || [],
    publishRegion: idx(data, _ => _.publishData.publishRegion) || [],
    postId: idx(data, _ => _.publishData.postId) || '',
    postHash: idx(data, _ => _.publishData.postHash) || '',
    buttonDisabled: false,
    userId: data.user_id,
    category: data.category || null,
    isSensitive: data.isSensitive || false,
    specialPost: data.specialPost || false,
    tags: data.tags || [],
    postCategories: data.postCategories || [],
    crop: data.crop || initialCrop
  };
};

export const validateState = state => {
  let isError = false,
    message;

  const imageRegex = /^https?:\/\/.*\.(?:png|jpg|gif|png|jpeg)$/i;

  if (null === state.publishedDate) {
    isError = true;
    message = INVALID_DATE;
  } else {
    const date = moment(state.publishedDate, 'DD/MM/YYYY H:mm', true);
    if (!date.isValid()) {
      isError = true;
      message = INVALID_DATE;
    }
  }
  if (moment(state.publishedDate, 'DD/MM/YYYY H:mm:ss').isBefore(moment())) {
    isError = true;
    message = PUBLISH_POST_WARNING;
  } else if (null === state.category) {
    isError = true;
    message = CATEGORY_FIELD_EMPTY;
  } else if ('' === state.meta.social.facebook) {
    isError = true;
    message = FACEBOOK_FIELD_EMPTY;
  } else if ('' === state.meta.social.twitter) {
    isError = true;
    message = TWITTER_FIELD_EMPTY;
  } else if (state.meta.social.facebook === state.title) {
    isError = true;
    message = FACEBOOK_TEXT_SAME_POST_TITLE;
  } else if (0 === state.publishRegion.length) {
    isError = true;
    message = EMPTY_COUNTRY_ARRAY;
  } else if (0 === state.tags.length) {
    isError = true;
    message = TAG_FIELD_EMPTY;
  }

  for (let key in state.crop) {
    if (!state.crop[key]['validate']) {
      isError = true;
      message = IMAGE_CROP_WARNING;
    }
  }

  if ('club' === state.postType) {
    if (!imageRegex.test(state.meta.sponsor.image)) {
      isError = true;
      message = WRONG_LOGO_IMAGE_ADDRESS;
    } else if ('' === state.meta.sponsor.name) {
      isError = true;
      message = SPONSOR_NAME_EMPTY;
    } else if ('' === state.meta.sponsor.tracker) {
      isError = true;
      message = TRACKER_EMPTY;
    }
  }

  return { isError, message };
};

const initialCrop = {
  square: {
    aspect: 1,
    x: 10,
    height: 100,
    validate: false
  },
  golden: {
    aspect: 1.618,
    y: 5,
    width: 100,
    validate: false
  },
  panoramic: {
    aspect: 2.618,
    y: 20,
    width: 100,
    validate: false
  }
};
export const initialMeta = {
  homepage: { content: null },
  index: '',
  sponsor: { name: '', image: '', tracker: '' },
  css: { skinName: '' },
  seo: {},
  showSocialShareButtons: false,
  microsite: {
    name: '',
    gaSnippet: '',
    showWSLLogo: true,
    showSocialButtons: true
  },
  author: { showAuthorInfo: false },
  social: {
    twitter: '',
    facebook: ''
  },
  showDate: false
};

export const initialState = {
  status: 'draft',
  postRepostBlogNames: [],
  publishRegion: [],
  postId: '',
  postType: '',
  commentStatus: 'open',
  postHash: '',
  publishedDate: '',
  meta: initialMeta,
  isSensitive: false,
  specialPost: false,
  buttonDisabled: true,
  isError: false,
  message: '',
  snackbarOpen: false,
  SnackbarMessage: '',
  crop: initialCrop,
  allCategories: [],
  category: null,
  tags: [],
  postCategories: []
};

export const filterCategories = (data: {}) => {
  let categories = [];
  for (let key in data) {
    let categoryGroup = data[key]['children'];
    if (undefined !== categoryGroup) {
      categoryGroup.forEach(function(category) {
        categories.push({
          label: category['cat_name'],
          id: Number(category['id'])
        });
      });
    } else {
      let category = data[key];
      categories.push({
        id: Number(category['id']),
        label: category['name']
      });
    }
  }
  return categories;
};

export const convertTo1DArray = (data: Array<{ id: number }>) => {
  let list = [];
  data.forEach(item => {
    list.push(item.id);
  });
  return list;
};
