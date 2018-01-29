//@flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { InputEvent } from 'lib/flowTypes';
import { Dialog, RaisedButton } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';

import { closeModal } from 'actions/modal';
import { CloseButton, Label } from 'components/Editor/ImageUploader';

type Props = {
  modalName: string,
  addSection: (params: { type: string, text: string }) => void,
  closeModal: () => void
};

type State = {
  summary: string
};

const styles = {
  dialog: {
    width: '90%',
    maxWidth: 'none'
  }
};

class SummaryModal extends PureComponent<Props, State> {
  state = {
    summary: ''
  };

  addSummary = () => {
    const params = {
      type: 'summary',
      text: this.state.summary
    };
    this.props.addSection(params);
  };

  onTextChange = (e: InputEvent, value: string) => {
    this.setState({ summary: value.trim() });
  };

  render() {
    const { modalName, closeModal } = this.props;
    const actions = (
      <div className="modal-actions">
        <RaisedButton label="Insertar Sumario" onClick={this.addSummary} />
      </div>
    );
    const title = (
      <div className="modal-title">
        <Row className="m-no-margin">
          <Col sm={11}>
            <Label
              label="Insertar sumario en el artículo"
              hint="Puedes usar enlaces y cursiva para destacar"
            />
          </Col>
          <Col sm={1} className="end-sm">
            <CloseButton handleClose={closeModal} />
          </Col>
        </Row>
      </div>
    );

    return (
      <Dialog
        actions={actions}
        title={title}
        open={'summaryModal' === modalName}
        modal
        onRequestClose={() => {}}
        contentStyle={styles.dialog}
      >
        <div className="summaryDialog">
          <TextField
            hintText="Texto del sumario"
            fullWidth
            onChange={this.onTextChange}
          />
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.modal
  };
};

export default connect(mapStateToProps, { closeModal })(SummaryModal);
