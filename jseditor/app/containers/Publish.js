import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { white, grey900 } from 'material-ui/styles/colors';

import TitleBar from '../components/TitleBar';

injectTapEventPlugin();

const customTheme = getMuiTheme({
  palette: {
    primary1Color: grey900,
    textColor: white,
  }
});

class Publish extends React.Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={customTheme}>
        <TitleBar />
      </MuiThemeProvider>
    );
  }
}

export default Publish;
