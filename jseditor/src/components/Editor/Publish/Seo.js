/* @flow */
import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { TextField, Divider } from 'material-ui';
import { InputEvent } from 'lib/flowTypes';
import { Label } from './index';

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
      <Col className="column" sm={12}>
        <Label
          label="SEO "
          hint="Título y descripción que aparece al buscar en Google"
        />
      </Col>
      <Col className="column" sm={12}>
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
          floatingLabelText={<span>Título SEO</span>}
        />
        <Divider />
      </Col>
      <Col className="column" sm={12}>
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
          floatingLabelText="Descripción SEO"
        />
        <Divider />
      </Col>
    </Row>
  );
};
