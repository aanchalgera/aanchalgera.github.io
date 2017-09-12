export const roleBasedPermissions = {
  collaborator: {
    SponsoredContent: false
  },
  coordinator: {
    SponsoredContent: true
  },
  editor: {
    SponsoredContent: true
  }
};

export const typeBasedPermissions = {
  club: {
    SponsoredContent: true
  },
  slideshow: {
    SponsoredContent: false
  },
  normal: {
    SponsoredContent: false
  },
  basic: {
    SponsoredContent: false
  }
};
