import { combineReducers } from 'redux';
import ImagesReducer from 'components/Editor/ImageUploader/reducer/Images';
import Configs from './Configs';

const rootReducer = combineReducers({
  images: ImagesReducer,
  configs: Configs
});

export default rootReducer;
