import { combineReducers } from 'redux';
import images from 'components/Editor/ImageUploader/reducer';
import configs from './Configs';
import post from './postReducer';
import sections from './sectionReducer';

const rootReducer = combineReducers({
  images,
  configs,
  post,
  sections
});

export default rootReducer;
