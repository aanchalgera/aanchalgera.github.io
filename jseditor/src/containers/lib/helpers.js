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
    publishedDate: idx(data, _ => _.publishData.postDate) || null,
    postRepostBlogNames:
      idx(data, _ => _.publishData.postRepostBlogNames) || [],
    publishRegion: idx(data, _ => _.publishData.publishRegion) || [],
    postId: idx(data, _ => _.publishData.postId) || '',
    postHash: idx(data, _ => _.publishData.postHash) || '',
    buttonDisabled: false,
    userId: data.user_id,
    category: data.category,
    isSensitive: data.isSensitive || false,
    specialPost: data.specialPost || false,
    tags: data.tags || []
  };
};

export const initialState = {
  fields: [],
  status: 'draft',
  postRepostBlogNames: [],
  publishRegion: [],
  postId: '',
  postHash: '',
  meta: {
    homepage: { content: null },
    index: '',
    sponsor: { name: '', image: '', tracker: '' },
    css: { skinName: '' },
    seo: {},
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
    comment: { allowed: true, status: 'open' }
  },
  isSensitive: false,
  specialPost: false,
  buttonDisabled: true,
  isError: false,
  message: '',
  publishedDate: '',
  snackbarOpen: false,
  SnackbarMessage: '',
  crop: {
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
  },
  category: -1,
  tags: []
};
