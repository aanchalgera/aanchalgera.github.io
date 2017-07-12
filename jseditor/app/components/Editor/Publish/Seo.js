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
  
const Seo = (props) => (
  <div>
    <Subheader className="subheader">SEO <span>Titulo y descripcion que aparece al buscar en Google</span></Subheader>
    <Divider className="divider" />
    <Row>
      <Col xs={12}>
        <TextField
          hintText="..."
          hintStyle={styles.hintStyle}
          floatingLabelFixed={true}
          multiLine={true}
          rows={3}
          rowsMax={3}
          underlineShow={false}
          fullWidth={true}
          value={props.seo.title}
          onChange={props.updateSeoTitle.bind(this)}
          floatingLabelText={<span>Titulo SEO</span>}
        />
        <Divider/>
      </Col>
    </Row>
    <Row>
      <Col xs={12}>
        <TextField
          hintText="..."
          hintStyle={styles.hintStyle}
          floatingLabelFixed={true}
          multiLine={true}
          rows={3}
          rowsMax={3}
          underlineShow={false}
          fullWidth={true}
          value={props.seo.description}
          onChange={props.updateSeoDescription.bind(this)}
          floatingLabelText='Descripcion SEO'
        />
        <Divider />
      </Col>
    </Row>
  </div>
);

Seo.propTypes = propValidate;

export default Seo;
