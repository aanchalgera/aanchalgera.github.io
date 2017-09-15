const ALL_TYPES = ['normal', 'slideshow', 'club', 'basics'];

export const viewPermissions = {
  SponsoredContent: {
    roles: ['ROLE_BRANDED_COORDINATOR'],
    types: ['club']
  },
  AdvancedOptions: {
    roles: ['ROLE_EDITOR', 'ROLE_BRANDED_COORDINATOR'],
    types: ['normal']
  },
  CountriesFormOptions: {
    roles: ['ROLE_EDITOR', 'ROLE_BRANDED_COORDINATOR'],
    types: ['normal', 'club']
  },
  OtherCategories: {
    roles: ['ROLE_EDITOR'],
    types: ['normal', 'slideshow', 'basics']
  },
  PostScheduler: {
    roles: ['ROLE_EDITOR', 'ROLE_BRANDED_COORDINATOR'],
    types: ALL_TYPES
  }
};
