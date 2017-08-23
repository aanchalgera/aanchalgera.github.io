/* @flow */
import React from 'react';
import Divider from 'material-ui/Divider';

type Props = { label: string };

const Label = (props: Props) => {
  return (
    <div>
      <h2>
        {props.label}
      </h2>
      <Divider />
    </div>
  );
};

export default Label;
