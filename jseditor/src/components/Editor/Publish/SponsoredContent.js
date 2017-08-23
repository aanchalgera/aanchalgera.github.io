/* @flow */
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import TextArea from './TextArea';
import Label from './Label';

type Props = {
  customerName: string,
  setCustomerName: Function,
  urlTracker: string,
  setUrlTracker: Function,
  logo: string,
  setLogo: Function
};

class SponsoredContent extends Component {
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
              setValue={this.props.setCustomerName}
              floatingLabel="Nombre del Cliente (se usa con 'Offrecido por' portada)"
            />
          </Col>
          <Col xs>
            <TextArea
              savedValue={this.props.logo}
              hintText="https://.."
              setValue={this.props.setLogo}
              floatingLabel="Direccion del logotipo"
            />
          </Col>
          <Col xs>
            <TextArea
              savedValue={this.props.urlTracker}
              hintText="..."
              setValue={this.props.setUrlTracker}
              floatingLabel="URL Tracker"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default SponsoredContent;
