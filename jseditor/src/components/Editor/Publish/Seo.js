import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { TextField, Divider, Subheader } from 'material-ui';

const propValidate = {
  seo: PropTypes.object.isRequired,
  updateSeoTitle: PropTypes.func.isRequired,
  updateSeoDescription: PropTypes.func.isRequired
};

const Seo = ({seo, updateSeoTitle, updateSeoDescription}) => (
    <Row>
      <Col lg={12}>
        <Subheader className="subheader">SEO <span>Titulo y descripcion que aparece al buscar en Google</span></Subheader>
        <Divider className="divider" />
      </Col>
      <Col lg={12}>
        <TextField
          hintText="..."
          floatingLabelFixed={true}
          multiLine={true}
          rows={3}
          rowsMax={3}
          underlineShow={false}
          fullWidth={true}
          value={seo.title}
          onChange={updateSeoTitle}
          floatingLabelText={<span>Titulo SEO</span>}
        />
        <Divider/>
      </Col>
      <Col lg={12}>
        <TextField
          hintText="..."
          floatingLabelFixed={true}
          multiLine={true}
          rows={3}
          rowsMax={3}
          underlineShow={false}
          fullWidth={true}
          value={seo.description}
          onChange={updateSeoDescription}
          floatingLabelText='Descripcion SEO'
        />
        <Divider />
      </Col>
    </Row>
);

Seo.propTypes = propValidate;

export default Seo;
