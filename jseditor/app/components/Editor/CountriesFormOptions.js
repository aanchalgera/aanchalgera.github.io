import React, { PropTypes } from 'react';
import CheckboxGroup from 'react-checkbox-group';

class CountriesFormOptions extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value : [],
    };
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.publishRegions
    });
  }
  render () {
    return(
      <div className="form-group" id="countries">
        <fieldset className="country">
          <legend>Publicar en los países</legend>
          <CheckboxGroup
            name="countries"
            value={this.state.value}
            ref="countryOptions"
          >
            <div className="field-repost">
              <label className="label-inline">
                <input type="checkbox" value="ES" name="publish-region[]" />España
              </label>
              <label className="label-inline">
                <input type="checkbox" value="US" name="publish-region[]" />EE.UU
              </label>
              <label className="label-inline">
                <input type="checkbox" value="MX" name="publish-region[]" />México
              </label>
              <label className="label-inline">
                <input type="checkbox" value="PE" name="publish-region[]" />Perú
              </label>
              <label className="label-inline">
                <input type="checkbox" value="ROW" name="publish-region[]" />Resto del mundo
              </label>
            </div>
          </CheckboxGroup>
        </fieldset>
      </div>
    )
  }
}

export default CountriesFormOptions;
