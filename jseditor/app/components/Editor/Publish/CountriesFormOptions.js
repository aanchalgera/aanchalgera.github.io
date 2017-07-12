import React from 'react';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import { Row, Col } from 'react-flexbox-grid';

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

class CountriesFormOptions extends React.Component {
  onCheck(e, checked) {
    const region = e.target.value;
    let publishRegions = this.props.publishRegions;
    const index = publishRegions.indexOf(region);
    if (-1 === index) {
      if (checked) {
        publishRegions.push(region);
      }
    } else {
      if (!checked) {
        publishRegions.splice(index, 1);
      }
    }
    this.props.setPublishRegions(publishRegions);
  }

  render() {
    const checkboxes = { 0: [], 1: [] };
    Object.keys(regions).map((key, index) => {
      checkboxes[index % 2].push((
        <Checkbox
          key={index}
          value={key}
          label={regions[key]}
          checked={-1 !== this.props.publishRegions.indexOf(key)}
          onCheck={this.onCheck.bind(this)}
        />
      ));
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

export default CountriesFormOptions;
