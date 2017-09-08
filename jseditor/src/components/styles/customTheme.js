import {
  indigo50,
  indigo100,
  indigo500,
  grey900,
  grey600,
  grey300,
  pink50,
  pink100,
  pink500,
  white,
  cyan500,
  fullBlack
} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const palette = {
  primary1Color: indigo500,
  primary2Color: indigo50,
  primary3Color: indigo100,
  accent1Color: pink500,
  accent2Color: pink50,
  accent3Color: pink100,
  textColor: grey900,
  secondaryTextColor: grey600,
  alternateTextColor: white,
  borderColor: grey300,
  pickerHeaderColor: cyan500,
  shadowColor: fullBlack
};

export const customTheme = getMuiTheme({
  palette: palette,
  toolbar: {
    backgroundColor: fullBlack
  },
  tabs: {
    backgroundColor: fullBlack
  },
  flatButton: {
    textColor: palette.alternateTextColor
  },
  svgIcon: {
    color: palette.alternateTextColor
  }
});
