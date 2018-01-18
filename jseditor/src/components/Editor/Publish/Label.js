/* @flow */
import * as React from 'react';

type Props = {
  label: string,
  hint?: string
};

export const Label = (props: Props) => {
  return (
    <div className="u-h-separator">
      <h2 className="type-title-dark">
        {props.label}
        <small className="caption-default"> {props.hint}</small>
      </h2>
    </div>
  );
};
