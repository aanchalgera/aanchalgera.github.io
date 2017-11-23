import { base } from 'lib/firebase';

export const getImages = id => {
  return base.fetch('images/' + id, {
    context: this,
    asArray: true,
    then(data) {
      return data;
    }
  });
};
