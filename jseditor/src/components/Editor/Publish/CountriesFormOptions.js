/* @flow */
import React from 'react';
import { Checkbox } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';
import { toggleItem } from 'lib/helpers';
import { InputEvent } from 'lib/flowTypes';
import { Label } from './index';

let regions = {
  ES: 'España',
  US: 'EE.UU',
  MX: 'México',
  PE: 'Perú',
  AR: 'Argentina',
  CL: 'Chile',
  EC: 'Ecuador',
  CR: 'Costa Rica',
  CO: 'Columbia',
  CEA: 'Centro America',
  ROW: 'Resto del mundo'
};

type Props = {
  updateParent: (data: Object) => void,
  publishRegions: Array<string>
};

export class CountriesFormOptions extends React.Component {
  props: Props;
  onCheck = (e: InputEvent) => {
    const region = e.currentTarget.value;
    let publishRegions = this.props.publishRegions;
    toggleItem(region, publishRegions);
    this.props.updateParent({ publishRegion: publishRegions });
  };

  render() {
    const checkboxes = [[], []];
    Object.keys(regions).forEach((key, index) => {
      checkboxes[index % 2].push(
        <Checkbox
          key={index}
          value={key}
          label={regions[key]}
          checked={-1 !== this.props.publishRegions.indexOf(key)}
          onCheck={this.onCheck}
          className="layout-line-form"
        />
      );
    });

    return (
      <div>
        <Label label="Países donde publicar" />
        <Row>
          <Col sm>{checkboxes[0]}</Col>
          <Col sm>{checkboxes[1]}</Col>
        </Row>
      </div>
    );
  }
}
