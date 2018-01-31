//@flow
import { base } from 'lib/firebase';
import { Image } from 'lib/flowTypes';

type ReceiveImages = (images: Array<Image>) => void;

export const getImages = (id: string, receiveImages: ReceiveImages) => {
  return base.listenTo('s3images/' + id, {
    context: this,
    asArray: true,
    then(data) {
      receiveImages(data);
    }
  });
};

export const postImage = (id: string, data: Image) => {
  return base.push('s3images/' + id, { data });
};
