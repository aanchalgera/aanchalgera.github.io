export const getConfig = (blogName, base) => {
  return base.fetch('config', {
    context: this,
    asArray: true,
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
