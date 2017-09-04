/* @flow */
import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { TextField, Divider, Subheader } from 'material-ui';
import { InputEvent } from './lib/flowTypes';

type Props = {
  seo: { title: string, description: string },
  setPostMeta: (string, {}) => void
};

export const Seo = ({ seo, setPostMeta }: Props) => {
  const updateSeoTitle = (e: InputEvent) => {
    setPostMeta('seo', {
      title: e.currentTarget.value,
      description: seo.description
    });
  };

  const updateSeoDescription = (e: InputEvent) => {
    setPostMeta('seo', {
      title: seo.title,
      description: e.currentTarget.value
    });
  };
  return (
    <Row>
      <Col lg={12}>
        <Subheader className="subheader">
          SEO <span>Titulo y descripcion que aparece al buscar en Google</span>
        </Subheader>
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
        <Divider />
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
          floatingLabelText="Descripcion SEO"
        />
        <Divider />
      </Col>
    </Row>
  );
};
