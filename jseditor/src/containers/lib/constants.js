const ALL_TYPES = ['normal', 'slideshow', 'club', 'basics', 'brandedLongform', 'longform'];

export const viewPermissions = {
  SponsoredContent: {
    roles: ['ROLE_BRANDED_COORDINATOR'],
    types: ['brandedLongform']
  },
  AdvancedOptions: {
    roles: ['ROLE_EDITOR', 'ROLE_BRANDED_COORDINATOR'],
    types: ['normal']
  },
  CountriesFormOptions: {
    roles: ['ROLE_EDITOR', 'ROLE_BRANDED_COORDINATOR'],
    types: ALL_TYPES
  },
  OtherCategories: {
    roles: ['ROLE_EDITOR'],
    types: ['normal', 'slideshow', 'basics']
  },
  PostScheduler: {
    roles: ['ROLE_EDITOR', 'ROLE_BRANDED_COORDINATOR'],
    types: ALL_TYPES
  },
  Categories: {
    roles: ['ROLE_BRANDED_COORDINATOR', 'ROLE_EDITOR'],
    types: ['normal', 'club', 'longform']
  },
  ShowDate: {
    roles: ['ROLE_BRANDED_COORDINATOR', 'ROLE_EDITOR'],
    types: ['longform', 'brandedLongform']
  },
  ShowSocialShareButtons: {
    roles: ['ROLE_BRANDED_COORDINATOR', 'ROLE_EDITOR'],
    types: ['longform', 'brandedLongform']
  },
  ShowAuthorInfo: {
    roles: ['ROLE_BRANDED_COORDINATOR', 'ROLE_EDITOR'],
    types: ['longform', 'brandedLongform']
  },
  Footer: {
    roles: ['ROLE_BRANDED_COORDINATOR', 'ROLE_EDITOR'],
    types: ['longform', 'brandedLongform']
  },
  Index: {
    roles: ['ROLE_BRANDED_COORDINATOR', 'ROLE_EDITOR'],
    types: ['longform', 'brandedLongform']
  },
  Css: {
    roles: ['ROLE_BRANDED_COORDINATOR', 'ROLE_EDITOR'],
    types: ['longform', 'brandedLongform']
  },
  AMP: {
    roles: ['ROLE_BRANDED_COORDINATOR'],
    types: ['brandedLongform', 'club', 'normal', 'longform']
  },
  FBIA: {
    roles: ['ROLE_BRANDED_COORDINATOR'],
    types: ['brandedLongform', 'club', 'normal', 'longform']
  }
};
