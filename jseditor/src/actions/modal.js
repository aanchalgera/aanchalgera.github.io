export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modalName, mode = 'add') => ({
  type: OPEN_MODAL,
  modalName,
  mode
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});
