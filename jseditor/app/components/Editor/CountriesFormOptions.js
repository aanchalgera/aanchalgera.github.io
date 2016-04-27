import React, { PropTypes } from 'react';
import CheckboxGroup from 'react-checkbox-group';

class CountriesFormOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.publishRegions,
    });
  }

  render () {
    return (
      <div className="form-group" id="countries">
        <fieldset className="country">
          <legend>Publicar en los países</legend>
          <CheckboxGroup
            name="countries"
            value={this.state.value}
            ref="countryOptions"
            onChange={this.props.setPublishRegions}
          >
          {
            Checkbox => (
              <div className="field-repost">
                <label className="label-inline">
                  <Checkbox value="ES"/>España
                </label>
                <label className="label-inline">
                  <Checkbox value="US"/>EE.UU
                </label>
                <label className="label-inline">
                  <Checkbox value="MX"/>México
                </label>
                <label className="label-inline">
                  <Checkbox value="PE"/>Perú
                </label>
                <label className="label-inline">
                  <Checkbox value="ROW"/>Resto del mundo
                </label>
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
