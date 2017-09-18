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
const INVALID_DATE = 'INVALID_DATE';
const WRONG_LOGO_IMAGE_ADDRESS = 'incorrecto dirección del logotipo';
const EMPTY_COUNTRY_ARRAY = 'Por favor seleccione un país';

export const loadStatefromData = (data: {}) => {
  return {
    id: data.id,
    blogName: data.blogName,
    fields: data.sections || [],
    title: data.title,
    postType: data.postType,
    meta: data.meta || {
      homepage: { content: '' },
      social: { twitter: '', facebook: '' },
      comment: { status: 'open' },
      author: { showAuthorInfo: false },
      seo: { title: '', description: '' }
    },
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
    otherCategories: data.otherCategories || [],
    crop: data.crop || initialCrop,
    customerName: data.customerName || '',
    logo: data.logo || '',
    urlTracker: data.urlTracker || ''
  };
};

export const validateState = state => {
  let isError = false,
    message;

  const imageRegex = /^https?:\/\/.*\.(?:png|jpg|gif|png|jpeg)$/i;

  const date = moment(state.publishedDate, 'DD/MM/YYYY HH:mm', true);
  if (!date.isValid()) {
    isError = true;
    message = INVALID_DATE;
  }
  if ('publish' === state.status) {
    if (moment(state.publishedDate, 'DD/MM/YYYY HH:mm:ss').isBefore(moment())) {
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
    }
  }

  for (let key in state.crop) {
    if (!state.crop[key]['validate']) {
      isError = true;
      message = IMAGE_CROP_WARNING;
    }
  }

  if (!imageRegex.test(state.logo)) {
    isError = true;
    message = WRONG_LOGO_IMAGE_ADDRESS;
  } else if (0 === state.publishRegion.length) {
    isError = true;
    message = EMPTY_COUNTRY_ARRAY;
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

export const initialState = {
  fields: [],
  status: 'draft',
  postRepostBlogNames: [],
  publishRegion: [],
  postId: '',
  postType: '',
  postHash: '',
  publishedDate: '',
  meta: {
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
    showDate: false,
    comment: { allowed: true, status: 'open' }
  },
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
  otherCategories: [],
  customerName: '',
  logo: '',
  urlTracker: ''
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
