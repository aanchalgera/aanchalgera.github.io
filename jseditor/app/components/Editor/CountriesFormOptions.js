import React from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

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
  render () {
    return (
      <div className="form-group" id="countries">
        <fieldset className="country">
          <legend>Publicar en los países</legend>
          <CheckboxGroup
            name="countries"
            className="field-repost"
            value={this.props.publishRegions}
            ref="countryOptions"
            onChange={this.props.setPublishRegions}
          >
            {
              Object.keys(regions).map((key) => (
                <label key={key} className="label-inline">
                  <Checkbox value={key} />{regions[key]}
                </label>
              ))
            }
          </CheckboxGroup>
        </fieldset>
      </div>
    );
  }
}

export default CountriesFormOptions;
