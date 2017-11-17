export const getImages = (base, slug) => {
  return base.fetch('images/' + slug, {
    context: this,
    asArray: true,
    then(data) {
      return data;
    }
  });
};
