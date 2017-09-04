import idx from 'idx';
import moment from 'moment-timezone';

export const loadStatefromData = (data: {}) => {
  return {
    id: data.id,
    blogName: data.blogName,
    fields: data.sections || [],
    title: data.title,
    meta: data.meta || {
      homepage: { content: '' },
      social: { twitter: '', facebook: '' },
      comment: { status: 'open' },
      author: { showAuthorInfo: false }
    },
    maxId: data.maxId,
    status: data.status || 'draft',
    date:
      idx(data, _ => _.publishData.postDate) ||
      moment().format('DD/MM/YYYY HH:mm'),
    publishedDate: idx(data, _ => _.publishData.postDate) || '',
    postRepostBlogNames:
      idx(data, _ => _.publishData.postRepostBlogNames) || [],
    publishRegion: idx(data, _ => _.publishData.publishRegion) || [],
    postId: idx(data, _ => _.publishData.postId) || '',
    postHash: idx(data, _ => _.publishData.postHash) || '',
    buttonDisabled: false,
    userId: data.user_id,
    category: data.category || '',
    isSensitive: data.isSensitive || false,
    specialPost: data.specialPost || false,
    tags: data.tags || [],
    otherCategories: data.otherCategories || [],
    crop: data.crop || initialCrop
  };
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
  category: -1,
  tags: [],
  otherCategories: []
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
