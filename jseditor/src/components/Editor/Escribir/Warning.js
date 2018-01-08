// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { closeModal } from 'actions/modal';

type Props = {
  modalName: string,
  closeModal: () => void
};

const Warning = ({ modalName, closeModal }: Props) => {
  const actions = [
    <FlatButton
      key="oldEditor"
      label="Volver al editor clásico"
      primary
      onClick={() => window.close()}
    />,
    <FlatButton
      label="Seguir en alfa"
      primary
      keyboardFocused
      onClick={closeModal}
      key="newEditor"
    />
  ];

  return (
    <div>
      <Dialog
        title="Warning"
        actions={actions}
        modal={false}
        open={'warningModal' === modalName}
        onRequestClose={closeModal}
      >
        warning content goes here
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ...state.modal
  };
};

export default connect(mapStateToProps, { closeModal })(Warning);
