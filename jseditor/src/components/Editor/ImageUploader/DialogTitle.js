import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

import { CloseButton, Label } from '.';

type Props = {
  label: string,
  hint?: string,
  closeDialog: () => void
};

export const DialogTitle = ({ label, hint, closeDialog }: Props) => (
  <div className="modal-title">
    <Row className="m-no-margin">
      <Col sm={11}>
        <Label
          label={label}
          hint={hint}
        />
      </Col>
      <Col sm={1} className="end-sm">
        <CloseButton handleClose={closeDialog} />
      </Col>
    </Row>
  </div>
);
