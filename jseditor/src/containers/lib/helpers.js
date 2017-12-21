import idx from 'idx';

import { currentHour, isFuture, isValidDate } from './momentHelper';
import { defaultCommentStatus } from 'lib/constants';

const IMAGE_CROP_WARNING =
  'Es necesario validar los recortes de las imágenes para poder publicar';
const TWITTER_FIELD_EMPTY = 'El texto de Twitter es obligatorio';
const FACEBOOK_FIELD_EMPTY = 'El texto de Facebook es obligatorio';
const FACEBOOK_TEXT_SAME_POST_TITLE =
  'El título para compartir el post en Facebook no puede ser igual que el título original del post';
const CATEGORY_FIELD_EMPTY = 'Por favor, elige al menos una categoría';
const WRONG_LOGO_IMAGE_ADDRESS = 'incorrecto dirección del logotipo';
const EMPTY_COUNTRY_ARRAY = 'Por favor seleccione un país';
const SPONSOR_NAME_EMPTY = 'nombre del cliente no puede estar vacío';
const TAG_FIELD_EMPTY = 'No ha asignado ninguna etiqueta al artículo';
const INVALID_DATE = 'FECHA INVALIDA';
const TITLE_MINLENGTH_WARNING = 'The title should be more than 5 characters';
const TITLE_MAXLENGTH_WARNING = 'The title can be 130 characters long';
const CONTENT_EMPTY_WARNING = 'Add some content to publish the post';

export const getPostType = (userRole: string) => {
  let postType = 'longform';
  const brandedRoles = [
    'ROLE_BRANDED_COLLABORATOR',
    'ROLE_BRANDED_COORDINATOR'
  ];
  if (brandedRoles.includes(userRole)) {
    postType = 'brandedLongform';
  }
  return postType;
};

export const validateDate = (date: string, currentStatus: string) => {
  if (null === date) {
    return false;
  }

  if (!isValidDate(date)) {
    return false;
  }
  if (currentStatus !== 'publish' && !isFuture(date)) {
    return false;
  }
  return true;
};

export const loadStatefromData = (data: {}, userRole: string) => {
  const initialDate =
    data.status === 'draft' ? currentHour() : data.publishData.postDate;
  const initialPublishRegions = [
    'ES',
    'US',
    'MX',
    'PE',
    'AR',
    'CL',
    'EC',
    'CR',
    'CO',
    'CEA',
    'ROW'
  ];

  const postType = data.postType || getPostType(userRole);

  if (data.meta) {
    data.meta.social.twitter = data.meta.social.twitter || data.title;
  } else {
    data.meta = initialMeta;
    data.meta.social.twitter = data.title;
  }

  return {
    id: data.id,
    blogName: data.blogName,
    fields: data.sections || [],
    title: data.title,
    postType: postType,
    commentStatus:
      data.commentStatus ||
      idx(data, _ => _.meta.comment.status) ||
      defaultCommentStatus[postType],
    meta: data.meta,
    maxId: data.maxId,
    status: data.status || 'draft',
    publishedDate: initialDate,
    postRepostBlogNames:
      idx(data, _ => _.publishData.postRepostBlogNames) || [],
    publishRegion:
      idx(data, _ => _.publishData.publishRegion) || initialPublishRegions,
    buttonDisabled: false,
    userId: data.user_id,
    category: data.category || null,
    isSensitive: data.isSensitive || false,
    specialPost: data.specialPost || false,
    tags: data.tags || [],
    postCategories: data.postCategories || [],
    crop: data.crop || initialCrop,
    ampVisibility: data.ampVisibility || false,
    iaVisibility: data.iaVisibility || false,
    currentStatus: currentStatus(data.status, initialDate),
    primaryImage: getPrimaryImg(data.sections) || ''
  };
};
export const loadPublishData = (data: {}) => {
  return {
    postId: idx(data, _ => _.publishData.postId) || '',
    postHash: idx(data, _ => _.publishData.postHash) || ''
  };
};
const currentStatus = (status, publishedDate) => {
  if (status === 'draft') {
    return status;
  } else if (isFuture(publishedDate)) {
    return 'future';
  } else {
    return 'publish';
  }
};

const validateTitle = (title: string) => {
  let isError = false,
    message;
  if ('' === title.trim() || 5 >= title.length) {
    isError = true;
    message = TITLE_MINLENGTH_WARNING;
  } else if (130 <= title.length) {
    isError = true;
    message = TITLE_MAXLENGTH_WARNING;
  }
  return { isError, message };
};

const validateContent = fields => {
  let isError = false,
    message;
  if (fields.length < 2) {
    isError = true;
    message = CONTENT_EMPTY_WARNING;
  }
  return { isError, message };
};

export const validateState = state => {
  const imageRegex = /^https?:\/\/.*\.(?:png|jpg|gif|png|jpeg)$/i;

  let { isError, message } = validateTitle(state.title);
  if (!isError) {
    ({ isError, message } = validateContent(state.fields));
  }
  if (null === state.category) {
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

  if ('brandedLongform' === state.postType) {
    if (!imageRegex.test(state.meta.sponsor.image)) {
      isError = true;
      message = WRONG_LOGO_IMAGE_ADDRESS;
    } else if ('' === state.meta.sponsor.name) {
      isError = true;
      message = SPONSOR_NAME_EMPTY;
    }
  }

  if (!validateDate(state.publishedDate, state.currentStatus)) {
    isError = true;
    message = INVALID_DATE;
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
  homepage: { content: '' },
  index: '',
  sponsor: { name: '', image: '', tracker: '' },
  css: { skinName: '' },
  seo: { title: '', description: '' },
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
  footer: { hideFooter: false, content: '' },
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
  postCategories: [],
  errors: {},
  iaVisibility: false,
  ampVisibility: false
};

export const convertTo1DArray = (data: Array<{ id: number }>) => {
  let list = [];
  data.forEach(item => {
    list.push(item.id);
  });
  return list;
};

export const findByName = (name: string, list: Array<User>) =>
  list.find(item => item.label === name);

const getPrimaryImg = fields => {
  let imageSrc = null;
  if (fields) {
    for (let i = 0; i < fields.length; i++) {
      if (fields[i]['type'] === 'image') {
        imageSrc = `${fields[i].src}/original.${fields[i].extension}`;
        break;
      }
    }
  }
  return imageSrc;
};
