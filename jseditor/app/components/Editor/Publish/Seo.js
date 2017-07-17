import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

const propValidate = {
  seo: React.PropTypes.object.isRequired,
  updateSeoTitle: React.PropTypes.func.isRequired,
  updateSeoDescription: React.PropTypes.func.isRequired
};

const styles = {
  hintStyle:{
    bottom: '60px'
  }
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
          hintStyle={styles.hintStyle}
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
          hintStyle={styles.hintStyle}
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
