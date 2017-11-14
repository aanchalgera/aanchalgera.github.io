import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { MuiThemeProvider } from 'material-ui/styles';
import { customTheme } from '../src/containers/styles/customTheme';

function loadStories() {
  require('../src/stories');
}

const muiDecorator = storyFn => (
  <MuiThemeProvider muiTheme={customTheme}>{storyFn()}</MuiThemeProvider>
);

addDecorator(muiDecorator);
configure(loadStories, module);
