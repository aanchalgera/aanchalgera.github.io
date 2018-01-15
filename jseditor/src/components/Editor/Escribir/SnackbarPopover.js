// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { openModal } from 'actions/modal';
import { base } from 'lib/firebase';
import configParams from 'config/configs';

type Props = {
  modalName: string,
  openModal: (modalName: string) => void,
  userId: number
};

const styles = {
  snackbar: {
    top: '55px',
    left: '20px',
    transform: 'translate(0,0)'
  }
};

const SnackbarPopover = ({ modalName, openModal, userId }: Props) => {
  const openNewsModal = async () => {
    await base.update('releases/' + configParams.version + '/' + userId, {
      data: {
        viewed: true
      }
    });
    openModal('newsModal');
  };

  return (
    <Snackbar
      className="newsPopover"
      open={'snackbarPopover' === modalName}
      message="ya puedes usar galerías de fotos"
      autoHideDuration={3600000}
      action="saber más"
      onActionClick={openNewsModal}
      onRequestClose={() => {}}
      style={styles.snackbar}
    />
  );
};

const mapStateToProps = state => {
  return {
    ...state.modal,
    userId: state.post.userId
  };
};

export default connect(mapStateToProps, { openModal })(SnackbarPopover);
