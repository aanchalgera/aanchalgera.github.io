export const getConfig = (blogName, base) => {
  return base.fetch('config', {
    context: this,
    queries: {
      orderByChild: 'site_name',
      equalTo: blogName
    }
  });
};

export const getPost = (postname, base) => {
  return base.fetch('posts/' + postname, {
    context: this
  });
};
