import { OPEN_MODAL, CLOSE_MODAL } from 'actions/modal';
import { DELETE_SECTION, OPEN_IMAGEPANEL } from 'actions/post';

const initialState = {
  modalName: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      const { modalName, index } = action;
      return {
        ...state,
        modalName: modalName + index
      };
    case CLOSE_MODAL:
    case DELETE_SECTION:
    case OPEN_IMAGEPANEL:
      return initialState;
    default:
      return state;
  }
}
