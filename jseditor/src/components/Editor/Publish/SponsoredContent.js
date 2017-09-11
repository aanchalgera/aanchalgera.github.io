/* @flow */
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { TextArea, Label } from './index';

type Props = {
  customerName: string,
  urlTracker: string,
  logo: string,
  updateParent: (data: Object) => void
};

export class SponsoredContent extends Component {
  props: Props;
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
            <TextArea
              savedValue={this.props.customerName}
              hintText="Socialmedia SL"
              updateParent={this.props.updateParent}
              floatingLabel="Nombre del Cliente (se usa con 'Offrecido por' portada)"
              valueToUpdate="customerName"
            />
          </Col>
          <Col xs>
            <TextArea
              savedValue={this.props.logo}
              hintText="https://.."
              updateParent={this.props.updateParent}
              floatingLabel="Direccion del logotipo"
              valueToUpdate="logo"
            />
          </Col>
          <Col xs>
            <TextArea
              savedValue={this.props.urlTracker}
              hintText="..."
              updateParent={this.props.updateParent}
              floatingLabel="URL Tracker"
              valueToUpdate="urlTracker"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
