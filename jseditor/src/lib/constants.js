const ALL_TYPES = [
  'normal',
  'slideshow',
  'club',
  'basics',
  'brandedLongform',
  'longform'
];

const ALL_COORDINATORS = [
  'ROLE_EDITOR',
  'ROLE_BRANDED_COORDINATOR',
  'ROLE_COORDINATOR',
  'ROLE_COLLABORATOR'
];

const ALL_NON_BRANDED_ROLES = [
  'ROLE_EDITOR',
  'ROLE_COLLABORATOR',
  'ROLE_COORDINATOR',
  'ROLE_DIRECTOR'
];

const ALL_BRANDED_ROLES = [
  'ROLE_BRANDED_COORDINATOR',
  'ROLE_BRANDED_COLLABORATOR'
];

export const viewPermissions = {
  SponsoredContent: {
    roles: ['ROLE_BRANDED_COORDINATOR'],
    types: ['brandedLongform']
  },
  AdvancedOptions: {
    roles: ALL_COORDINATORS,
    types: ALL_TYPES
  },
  CountriesFormOptions: {
    roles: ALL_COORDINATORS,
    types: ALL_TYPES
  },
  OtherCategories: {
    roles: ALL_COORDINATORS,
    types: ['normal', 'slideshow', 'basics', 'longform']
  },
  PostScheduler: {
    roles: ALL_COORDINATORS,
    types: ALL_TYPES
  },
  Categories: {
    roles: ALL_COORDINATORS,
    types: ['normal', 'club', 'longform']
  },
  ShowDate: {
    roles: ALL_COORDINATORS,
    types: ['longform', 'brandedLongform']
  },
  ShowSocialShareButtons: {
    roles: ALL_COORDINATORS,
    types: ['longform', 'brandedLongform']
  },
  ShowAuthorInfo: {
    roles: ALL_COORDINATORS,
    types: ['longform', 'brandedLongform']
  },
  Footer: {
    roles: ALL_COORDINATORS,
    types: ['longform', 'brandedLongform']
  },
  Index: {
    roles: ALL_COORDINATORS,
    types: ['longform', 'brandedLongform']
  },
  Css: {
    roles: ALL_COORDINATORS,
    types: ['longform', 'brandedLongform']
  },
  AMP: {
    roles: ['ROLE_BRANDED_COORDINATOR'],
    types: ['club', 'brandedLongform']
  },
  FBIA: {
    roles: ['ROLE_BRANDED_COORDINATOR'],
    types: []
  },
  PublicationLabel: {
    roles: ['ROLE_BRANDED_COLLABORATOR'],
    types: ['brandedLongform', 'club']
  },
  MoreOptions: {
    roles: ALL_COORDINATORS,
    types: ['slideshow', 'club', 'basics', 'brandedLongform', 'longform']
  },
  SpecialPost: {
    roles: ['ROLE_EDITOR', 'ROLE_COORDINATOR', 'ROLE_COLLABORATOR'],
    types: ['normal', 'slideshow']
  },
  Tags: {
    roles: ALL_COORDINATORS,
    types: ALL_TYPES
  },
  EditWarning: {
    roles: ['ROLE_COORDINATOR', 'ROLE_COLLABORATOR', 'ROLE_EDITOR'],
    types: ['normal', 'slideshow', 'basics', 'longform']
  }
};

export const defaultCommentStatus = {
  normal: 'open',
  club: 'open',
  slideshow: 'open',
  basics: 'open',
  brandedLongform: 'closed',
  longform: 'closed'
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

export const initialPublishRegions = [
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

export const postTypePermissions = {
  normal: {
    roles: ALL_NON_BRANDED_ROLES
  },
  longform: {
    roles: ALL_NON_BRANDED_ROLES
  },
  brandedLongform: {
    roles: ALL_BRANDED_ROLES
  }
};
