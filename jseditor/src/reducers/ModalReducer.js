import { OPEN_MODAL, CLOSE_MODAL } from 'actions/modal';

const initialState = {
  modalName: 'warningModal'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      const { modalName } = action;
      return {
        ...state,
        modalName
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalName: ''
      };
    default:
      return state;
  }
}
