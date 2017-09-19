/* @flow */
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Label } from './index';
import TextField from 'material-ui/TextField';

type Props = {
  customerName: string,
  urlTracker: string,
  logo: string,
  updateParent: (data: Object) => void
};

export class SponsoredContent extends Component {
  props: Props;

  handleChange = (value, valueToUpdate) => {
    let {sponsor: sponsor, ...restMetaFields} = this.props.meta;
    let {[valueToUpdate]: temp, ...restSponsorFields} = sponsor;
    this.props.updateParent({meta: {sponsor: {[valueToUpdate]: value, ...restSponsorFields}, ...restMetaFields}});
  }

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
              defaultValue={this.props.meta.sponsor.name}
              hintText="Socialmedia SL"
              floatingLabelText="Nombre del Cliente (se usa con 'Offrecido por' portada)"
              floatingLabelFixed={true}
              onChange={(e, value)=> {this.handleChange(value, 'name')}}
              fullWidth={true}
            />
          </Col>
          <Col xs>
            <TextField
              defaultValue={this.props.meta.sponsor.image}
              hintText="https://.."
              floatingLabelText="Direccion del logotipo"
              floatingLabelFixed={true}
              onChange={(value)=> {this.handleChange(value, 'image')}}
              fullWidth={true}
            />
          </Col>
          <Col xs>
            <TextField
              defaultValue={this.props.meta.sponsor.tracker}
              hintText="..."
              floatingLabelText="URL Tracker"
              floatingLabelFixed={true}
              onChange={(value)=> {this.handleChange(value, 'tacker')}}
              fullWidth={true}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
