// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { closeModal } from 'actions/modal';

type Props = {
  postId: number,
  blogUrl: string,
  modalName: string,
  closeModal: () => void
};

const Warning = ({ postId, blogUrl, modalName, closeModal }: Props) => {
  const editUrl = postId || 'new';
  const actions = [
    <FlatButton
      key="oldEditor"
      label="Volver al editor clásico"
      primary
      href={`${blogUrl}/admin/newposts/${editUrl}`}
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
