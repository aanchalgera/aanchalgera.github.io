import reducer from './ModalReducer';

import { openModal, closeModal } from 'actions/modal';

describe('modal reducer', () => {
  it('should provide the initial state', () => {
    const initialState = {
      modalName: 'warningModal'
    };
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should open modal', () => {
    const stateBefore = {};
    const action = openModal('testmodalName');
    const stateAfter = {
      modalName: 'testmodalName'
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should close modal', () => {
    const stateBefore = {
      modalName: 'testmodalName'
    };

    const action = closeModal();

    const stateAfter = { modalName: '' };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});
