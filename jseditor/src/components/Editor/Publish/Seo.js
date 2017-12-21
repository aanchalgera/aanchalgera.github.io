/* @flow */
import * as React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { TextField, Divider } from 'material-ui';
import { InputEvent } from 'lib/flowTypes';
import { Label } from './index';

const DESCRIPTION_MAX_LENGTH = 230;

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
    if (e.currentTarget.value.length <= DESCRIPTION_MAX_LENGTH) {
      setPostMeta('seo', {
        title: seo.title,
        description: e.currentTarget.value
      });
    }
  };
  return (
    <Row>
      <Col sm={12}>
        <Label
          label="SEO "
          hint="Título y descripción que aparece al buscar en Google"
        />
      </Col>
      <Col sm={12}>
        <TextField
          hintText="..."
          floatingLabelFixed
          multiLine
          rows={3}
          rowsMax={3}
          underlineShow={false}
          fullWidth
          value={seo.title}
          onChange={updateSeoTitle}
          floatingLabelText={<span>Título SEO</span>}
        />
        <Divider />
      </Col>
      <Col sm={12}>
        <TextField
          hintText="..."
          floatingLabelFixed
          multiLine
          rows={3}
          rowsMax={3}
          underlineShow={false}
          fullWidth
          value={seo.description}
          onChange={updateSeoDescription}
          floatingLabelText={`Descripción SEO (disponible: ${DESCRIPTION_MAX_LENGTH -
            seo.description.length})`}
        />
        <Divider />
      </Col>
    </Row>
  );
};
