import { combineReducers } from 'redux';
import ImagesReducer from 'components/Editor/ImageUploader/reducer';
import Configs from './Configs';
import post from './postReducer';

const rootReducer = combineReducers({
  images: ImagesReducer,
  configs: Configs,
  post: post
});

export default rootReducer;
