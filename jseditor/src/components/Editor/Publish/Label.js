/* @flow */
import React from 'react';
import Divider from 'material-ui/Divider';

type Props = { label: string };

export const Label = (props: Props) => {
  return (
    <div>
      <h2 className="type-title-dark">
        {props.label}
        <small className="caption-default">
          {props.hint}
        </small>
      </h2>
      <Divider />
    </div>
  );
};
