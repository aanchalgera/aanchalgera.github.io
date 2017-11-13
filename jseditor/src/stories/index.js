import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ImageAltTextPopover from '../components/Editor/Escribir/ImageAltTextPopover';
import ImagePanel from '../components/Editor/Escribir/ImagePanel';

storiesOf('ImageAltTextPopover', module).add('ImageAltTextPopover', () => (
  <ImageAltTextPopover
    open={true}
    imageSrc="https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg"
  />
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
