// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Dialog, RaisedButton } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';

import { closeModal } from 'actions/modal';
import { CloseButton } from 'components/Editor/ImageUploader';

type Props = {
  modalName: string,
  closeModal: () => void
};

const Warning = ({ modalName, closeModal }: Props) => {
  const action = (
    <Row className="m-no-margin modal-actions">
      <Col sm className="end-sm">
        <RaisedButton
          label="Editor Este Artículo en Alfa"
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
        actions={action}
        modal
        open={'EditWarning' === modalName}
        onRequestClose={closeModal}
        contentStyle={{ width: '95%', maxWidth: 'none' }}
        autoScrollBodyContent
      >
        <Row className="m-no-margin">
          <Col sm={11}>
            <h2 className="type-title-dark">Bienvenido a Alfa</h2>
          </Col>
          <Col sm={1} className="end-sm">
            <CloseButton handleClose={closeModal} />
          </Col>
        </Row>
        <div className="modal-content m-modal-bg">
          <Row className="m-no-margin">
            <Col sm={8} smOffset={2}>
              <div className="paragraph">
                <strong>Esto es un poco diferente, verdad?</strong>
              </div>
              <div className="paragraph">
                este artículo se ha creado con el nuevo editor{' '}
                <strong>Alfa</strong>, y sólo puede editarse con él. Te animamos
                a
              </div>
              <div className="paragraph">
                probarlo para tus propios artículos, puedes encontrarlo en{' '}
                <strong>
                  <quote>Escribir en Alfa\</quote>
                </strong>{' '}
                en el menú &#8801;
              </div>
              <div className="paragraph">
                Si tienes alguna duda sobre su funcionamiento, puedes preguntar
                en Slack #alfa-editor
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
    ...state.modal
  };
};

export default connect(mapStateToProps, { closeModal })(Warning);
