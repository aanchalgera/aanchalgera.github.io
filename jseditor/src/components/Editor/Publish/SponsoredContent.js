/* @flow */
import React, { PureComponent } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';

import { Label } from './Label';
import { InputEvent } from 'lib/flowTypes';

type Props = {
  setPostMeta: (key: string, data: Object) => void,
  sponsor: Object
};

export class SponsoredContent extends PureComponent<Props> {
  updateName = (e: InputEvent, value: string) => {
    this.props.setPostMeta('sponsor', {
      name: value,
      tracker: this.props.sponsor.tracker,
      image: this.props.sponsor.image
    });
  };

  updateImage = (e: InputEvent, value: string) => {
    this.props.setPostMeta('sponsor', {
      image: value,
      tracker: this.props.sponsor.tracker,
      name: this.props.sponsor.name
    });
  };

  updateTracker = (e: InputEvent, value: string) => {
    this.props.setPostMeta('sponsor', {
      tracker: value,
      image: this.props.sponsor.image,
      name: this.props.sponsor.name
    });
  };

  render() {
    return (
      <div>
        <Row className="bottom-xs">
          <Col sm={12}>
            <Label label="Contenido Patrocinado" />
          </Col>
          <Col sm>
            <TextField
              value={this.props.sponsor.name}
              hintText="Socialmedia SL"
              floatingLabelText="Nombre del Cliente (se usa con 'Ofrecido por' portada)"
              floatingLabelFixed
              onChange={this.updateName}
              fullWidth
            />
          </Col>
          <Col sm>
            <TextField
              value={this.props.sponsor.image}
              hintText="https://.."
              floatingLabelText="Direccion del logotipo"
              floatingLabelFixed
              onChange={this.updateImage}
              fullWidth
            />
          </Col>
          <Col sm>
            <TextField
              value={this.props.sponsor.tracker}
              hintText="..."
              floatingLabelText="URL Tracker"
              floatingLabelFixed
              onChange={this.updateTracker}
              fullWidth
            />
          </Col>
        </Row>
      </div>
    );
  }
}
