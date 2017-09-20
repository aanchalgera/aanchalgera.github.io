/* @flow */
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';

import { Label } from './Label';

type Props = {
  setPostMeta: (key: string, data: Object) => void,
  sponsor: Object
};

export class SponsoredContent extends Component {
  props: Props;

  updateName = (e: SyntheticEvent, value: string) => {
    this.props.setPostMeta('sponsor', {
      name: value,
      tracker: this.props.sponsor.tracker,
      image: this.props.sponsor.image
    });
  };

  updateImage = (e: SyntheticEvent, value: string) => {
    this.props.setPostMeta('sponsor', {
      image: value,
      tracker: this.props.sponsor.tracker,
      name: this.props.sponsor.name
    });
  };

  updateTracker = (e: SyntheticEvent, value: string) => {
    this.props.setPostMeta('sponsor', {
      tracker: value,
      image: this.props.sponsor.image,
      name: this.props.sponsor.name
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Col xs>
            <Label label="Contenido Patrocinado" />
          </Col>
        </Row>
        <Row>
          <Col xs>
            <TextField
              value={this.props.sponsor.name}
              hintText="Socialmedia SL"
              floatingLabelText="Nombre del Cliente (se usa con 'Offrecido por' portada)"
              floatingLabelFixed={true}
              onChange={this.updateName}
              fullWidth={true}
            />
          </Col>
          <Col xs>
            <TextField
              value={this.props.sponsor.image}
              hintText="https://.."
              floatingLabelText="Direccion del logotipo"
              floatingLabelFixed={true}
              onChange={this.updateImage}
              fullWidth={true}
            />
          </Col>
          <Col xs>
            <TextField
              value={this.props.sponsor.tracker}
              hintText="..."
              floatingLabelText="URL Tracker"
              floatingLabelFixed={true}
              onChange={this.updateTracker}
              fullWidth={true}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
