// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Dialog, RaisedButton } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

import { closeModal } from 'actions/modal';
import { CloseButton } from 'components/Editor/ImageUploader';
import { EditorFormatItalic, ImagePhoto, NavigationArrowBack } from 'material-ui/svg-icons';

type Props = {
  modalName: string,
  closeModal: () => void
};

const Warning = ({ modalName, closeModal }: Props) => {
  const actions = (
    <Row className="m-no-margin modal-actions">
      <Col sm={6} className="start-sm">
        <RaisedButton
          icon={<NavigationArrowBack />}
          key="oldEditor"
          label="Volver al editor clásico"
          onClick={() => window.close()}
        />
      </Col>
      <Col sm={6} className="end-sm">
        <RaisedButton
          label="Seguir en alfa"
          primary
          keyboardFocused
          onClick={closeModal}
          key="newEditor"
        />
      </Col>
    </Row>
  );

  return (
    <div>
      <Dialog
        actions={actions}
        modal
        open={'warningModal' === modalName}
        onRequestClose={closeModal}
        contentStyle={{ width: '95%', maxWidth: 'none' }}
        autoScrollBodyContent
      >
        <Row className="m-no-margin">
          <Col sm={11}>
            <h2 className="type-title-dark">
              Bienvenido a Alfa
              <small className="caption-default m-margin-left">
                Si tienes sugerencias o comentarios sobre este editor, cuéntanos en Slack <a href='https://weblogs.slack.com/messages/C8PFG2J4R/'>#alfa-editor</a>
              </small>
            </h2>
          </Col>
          <Col sm={1} className="end-sm">
            <CloseButton handleClose={closeModal} />
          </Col>
        </Row>
        <Row className="m-no-margin modal-content m-modal-bg">
          <Col sm={12}>Seguimos trabajando en este editor, asi que echarás de menos algunas cosas. Por ahora puedes usar:</Col>
          <Col sm={12} className="modal-icon-list">
            <EditorFormatItalic className="modal-icon" color="gray" />Texto con formato
            <ImagePhoto className="modal-icon" color="gray" />Imágenes estáticas
          </Col>
          <Col sm={12}>Si no es suficiente para el post que tienes en mente, puedes <a href="" onClick={() => window.close()}>volver al editor clasico</a>.</Col>
          <Col sm={12}>
            <span className="modal-warning">¡Cuidado! </span>
            Los borradores y posts que hagas en Alfa <b>no se podrán editar después desde el editor clásico</b>, aunque se pueden publicar y difundir desde aquí sin problema.
          </Col>
        </Row>
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
