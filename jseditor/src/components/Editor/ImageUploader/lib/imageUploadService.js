//@flow
import { base } from 'lib/firebase';
import { Image } from 'lib/flowTypes';

export const getImages = (id: string) => {
  return base.fetch('images/' + id, {
    context: this,
    asArray: true,
    then(data) {
      return data;
    }
  });
};

export const postImages = (id: string, data: Image) => {
  return base.push('images/' + id, { data });
};
