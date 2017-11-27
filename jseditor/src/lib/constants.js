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
    types: []
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
    types: [
      'slideshow',
      'club',
      'basics',
      'brandedLongform',
      'longform'
    ]
  },
};
