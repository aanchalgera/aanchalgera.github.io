// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { closeModal, openModal } from 'actions/modal';
import { base } from 'lib/firebase';
import configParams from 'config/configs';
import { currentTime } from 'containers/lib/momentHelper';

type Props = {
  modalName: string,
  closeModal: () => void,
  openModal: (modalName: string) => void,
  userId: number
};

const SnackbarPopover = ({
  modalName,
  closeModal,
  openModal,
  userId
}: Props) => {
  const openNewsModal = async () => {
    await base.update('releases/' + configParams.version + '/' + userId, {
      data: {
        viewed_on: currentTime()
      }
    });
    openModal('newsModal');
  };

  return (
    <Snackbar
      open={'snackbarPopover' === modalName}
      message="ya puedes usar galerías de fotos"
      autoHideDuration={4000}
      action="saber más"
      onActionClick={openNewsModal}
      onRequestClose={closeModal}
    />
  );
};

const mapStateToProps = state => {
  return {
    ...state.modal,
    userId: state.post.userId
  };
};

export default connect(mapStateToProps, { closeModal, openModal })(
  SnackbarPopover
);
