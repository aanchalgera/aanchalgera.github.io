export const getImages = (base, id) => {
  return base.fetch('images/' + id, {
    context: this,
    asArray: true,
    then(data) {
      return data;
    }
  });
};
