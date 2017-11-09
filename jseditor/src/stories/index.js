import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ImageAltTextPopover from '../components/Editor/Escribir/ImageAltTextPopover';

storiesOf('ImageAltTextPopover', module).add('ImageAltTextPopover', () => (
  <ImageAltTextPopover
    open={true}
    imageSrc="https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg"
  />
));
