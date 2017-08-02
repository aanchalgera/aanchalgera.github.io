import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';

const Label = (props) => {
  return (
    <div>
      <h2>{props.label}</h2>
      <Divider />
    </div>
  );
}

Label.propTypes = {
  label: PropTypes.string.isRequired
};

export default Label;