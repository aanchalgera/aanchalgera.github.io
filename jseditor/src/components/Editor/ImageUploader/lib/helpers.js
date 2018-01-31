//@flow
import { postImage as postImageToS3 } from 'lib/s3ImageUploadService';
import { postImage as postImageToFirebase } from './imageUploadService';

type UploadImageProps = {
  id: string,
  site: string,
  data: FormData
};

export const uploadImage = async ({ id, site, data }: UploadImageProps) => {
  const image = await postImageToS3(site, data);
  
  if (image.src) {
    postImageToFirebase(id, image);
    return { status: 200 };
  } else {
    return { status: 500 };
  }
};
