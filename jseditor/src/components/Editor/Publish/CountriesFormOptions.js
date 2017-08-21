import React from 'react';
import { Subheader, Divider, Checkbox } from 'material-ui';
import { Row, Col } from 'react-flexbox-grid';
import { toggleItem } from './lib/publishHelpers';

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

export class CountriesFormOptions extends React.Component {
  onCheck(e) {
    const region = e.target.value;
    let publishRegions = this.props.publishRegions;
    toggleItem(region, publishRegions);
    this.props.updateParent({ publishRegion: publishRegions });
  }

  render() {
    const checkboxes = { 0: [], 1: [] };
    Object.keys(regions).map((key, index) => {
      checkboxes[index % 2].push(
        <Checkbox
          key={index}
          value={key}
          label={regions[key]}
          checked={-1 !== this.props.publishRegions.indexOf(key)}
          onCheck={this.onCheck.bind(this)}
        />
      );
    });

    return (
      <div>
        <Subheader>Países donde publicar</Subheader>
        <Divider />
        <Row>
          <Col xs>
            {checkboxes[0]}
          </Col>
          <Col xs>
            {checkboxes[1]}
          </Col>
        </Row>
      </div>
    );
  }
}
