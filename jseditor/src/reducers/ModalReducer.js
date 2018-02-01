import { OPEN_MODAL, CLOSE_MODAL } from 'actions/modal';
import { ADD_SECTION, EDIT_SECTION } from 'actions/post';

const initialState = {
  modalName: 'warningModal',
  mode: 'add'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      const { modalName, mode } = action;
      return {
        ...state,
        modalName,
        mode
      };
    case ADD_SECTION:
    case CLOSE_MODAL:
    case EDIT_SECTION:
      return {
        ...state,
        modalName: '',
        mode: ''
      };
    default:
      return state;
  }
}
