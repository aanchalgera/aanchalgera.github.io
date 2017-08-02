import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import TextArea from './TextArea';
import Label from './Label';

class SponsoredContent extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col xs>
            <Label
              label="Contenido Patrocinado"
            />
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

SponsoredContent.propTypes = {
  customerName: PropTypes.string.isRequired,
  setCustomerName: PropTypes.func.isRequired,
  urlTracker: PropTypes.string.isRequired,
  setUrlTracker: PropTypes.func.isRequired,
  logo: PropTypes.string.isRequired,
  setLogo: PropTypes.func.isRequired,
}

export default SponsoredContent;