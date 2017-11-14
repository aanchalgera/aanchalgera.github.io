import React from 'react';

import { storiesOf } from '@storybook/react';

import ImageAltTextPopover from '../components/Editor/Escribir/ImageAltTextPopover';
import Title from '../components/Editor/Escribir/Title';

storiesOf('ImageAltTextPopover', module).add('ImageAltTextPopover', () => (
  <MuiThemeProvider>
    <ImageAltTextPopover
      open={true}
      imageSrc="https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg"
    />
  </MuiThemeProvider>
));

storiesOf('Title', module)
  .add('default', () => <Title title="" />)
  .add('with data', () => (
    <Title title="Samsung Galaxy S8+, analysis: el major telefono del mercado es imperfecto, pero irresistible" />
  ));
