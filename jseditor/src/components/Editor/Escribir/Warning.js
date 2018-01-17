// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Dialog, RaisedButton } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';
import { base } from 'lib/firebase';

import configParams from 'config/configs';
import { closeModal, openModal } from 'actions/modal';
import { CloseButton, Label } from 'components/Editor/ImageUploader';
import {
  EditorFormatItalic,
  ImagePhoto,
  NavigationArrowBack
} from 'material-ui/svg-icons';

type Props = {
  modalName: string,
  closeModal: () => void,
  userId: number,
  blogUrl: string,
  openModal: (modalName: string) => void
};

const Warning = ({ modalName, closeModal, openModal, userId, blogUrl }: Props) => {
  const closeWarningModal = async () => {
    const data = await base.fetch(
      'releases/' + configParams.version + '/' + userId,
      { context: this }
    );
    if (data.viewed) {
      closeModal();
    } else {
      openModal('snackbarPopover');
    }
  };

  const title = (
    <div className="modal-title">
      <Row className="m-no-margin">
        <Col sm={11}>
          <Label
            label="Bienvenido a Alfa"
            hint="Si tienes sugerencias o comentarios sobre este editor, cuéntanos en Slack #alfa-editor"
          />
        </Col>
        <Col sm={1} className="end-sm">
          <CloseButton handleClose={closeModal} />
        </Col>
      </Row>
    </div>
  );
  const actions = (
    <div className="modal-actions">
      <Row className="m-no-margin">
        <Col sm={6} className="start-sm">
          <RaisedButton
            icon={<NavigationArrowBack />}
            key="oldEditor"
            label="Volver al editor clásico"
            onClick={window.close}
          />
        </Col>
        <Col sm={6} className="end-sm">
          <RaisedButton
            label="Seguir en alfa"
            primary
            keyboardFocused
            onClick={closeWarningModal}
            key="newEditor"
          />
        </Col>
      </Row>
    </div>
  );

  return (
    <div>
      <Dialog
        actions={actions}
        title={title}
        modal
        open={'warningModal' === modalName}
        onRequestClose={closeModal}
        contentStyle={{ width: '95%', maxWidth: 'none' }}
        autoScrollBodyContent
      >
        <div className="modal-content m-modal-bg">
          <Row className="m-no-margin">
            <Col sm={8} smOffset={2}>
              <div className="paragraph">
                Seguimos trabajando en este editor, asi que echarás de menos
                algunas cosas. Por ahora puedes usar:
              </div>
              <div className="modal-icon-list">
                <div className="modal-icon-list-item">
                  <EditorFormatItalic className="modal-icon" />Texto
                  con formato
                </div>
                <div className="modal-icon-list-item">
                  <ImagePhoto className="modal-icon" />Imágenes
                  estáticas
                </div>
              </div>
              <div className="paragraph">
                Si no es suficiente para el post que tienes en mente, puedes{' '}
                <a href={`${blogUrl}/admin`} onClick={window.close}>
                  volver al editor clasico
                </a>.
              </div>
              <div className="paragraph">
                <span className="modal-warning">¡Cuidado! </span>
                Los borradores y posts que hagas en Alfa{' '}
                <b>no se podrán editar después desde el editor clásico</b>,
                aunque se pueden publicar y difundir desde aquí sin problema.
              </div>
            </Col>
          </Row>
        </div>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ...state.modal,
    userId: state.post.userId
  };
};

export default connect(mapStateToProps, { closeModal, openModal })(Warning);
