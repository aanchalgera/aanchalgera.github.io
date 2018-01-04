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

const Warning = (props: Props) => {
  const actions = [
    <FlatButton
      key="cancel"
      label="Cancel"
      primary
      onClick={props.closeModal}
    />,
    <FlatButton
      label="Submit"
      primary
      keyboardFocused
      onClick={props.closeModal}
      key="submit"
    />
  ];
  const { modalName } = props;

  return (
    <div>
      <Dialog
        title="Warning"
        actions={actions}
        modal={false}
        open={'warningModal' === modalName}
        onRequestClose={this.closeWaning}
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