export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modalName, index) => ({
  type: OPEN_MODAL,
  modalName,
  index
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});
