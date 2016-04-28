import React, { PropTypes } from 'react';
import CheckboxGroup from 'react-checkbox-group';

let regions = {
  ES: 'España',
  US: 'EE.UU',
  MX: 'México',
  PE: 'Perú',
  ROW: 'Resto del mundo',
};

class CountriesFormOptions extends React.Component {
  render () {
    return (
      <div className="form-group" id="countries">
        <fieldset className="country">
          <legend>Publicar en los países</legend>
          <CheckboxGroup
            name="countries"
            value={this.props.publishRegions}
            ref="countryOptions"
            onChange={this.props.setPublishRegions}
          >
          {
            Checkbox => (
              <div className="field-repost">
                {
                  Object.keys(regions).map((key) => (
                    <label key={key} className="label-inline">
                      <Checkbox value={key} />{regions[key]}
                    </label>
                  ))
                }
              </div>
            )
          }
          </CheckboxGroup>
        </fieldset>
      </div>
    );
  }
}

export default CountriesFormOptions;
