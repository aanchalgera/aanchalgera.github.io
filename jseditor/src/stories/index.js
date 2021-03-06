import React from 'react';

import { storiesOf } from '@storybook/react';

import {
  ImageAltTextPopover,
  ImagePanel,
  S3Uploader,
  Image
} from '../components/Editor/ImageUploader';
import { Title, MoreOptions } from '../components/Editor/Escribir';

storiesOf('ImageAltTextPopover', module).add('ImageAltTextPopover', () => (
  <ImageAltTextPopover
    open={true}
    imageSrc="https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg"
  />
));

storiesOf('Title', module)
  .add('default', () => <Title title="" />)
  .add('with data', () => (
    <Title title="Samsung Galaxy S8+, analysis: el major telefono del mercado es imperfecto, pero irresistible" />
  ));

storiesOf('ImagePanel', module).add('ImagePanel', () => (
  <ImagePanel
    open={true}
    images={[
      'https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg',
      'http://www.mybligr.com/wp-content/uploads/2017/03/cute-and-lovable-pictures-of-rabbits-33.jpg',
      'https://wallpaperclicker.com/storage/wallpaper/cute-cat-62650236.jpg'
    ]}
  />
));

storiesOf('MoreOptions', module).add('MoreOptions', () => <MoreOptions />);
storiesOf('S3Uploader', module).add('S3Uploader', () => (
  <S3Uploader open={true} />
));

storiesOf('Image', module).add('default', () => (
  <Image
    alt="Alt text"
    url="http://www.azquotes.com/picture-quotes/quote-if-you-will-it-it-is-no-dream-and-if-you-do-not-will-it-a-dream-it-is-and-a-dream-it-theodor-herzl-91-83-62.jpg"
  />
));
