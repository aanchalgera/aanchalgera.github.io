// @flow
import React from 'react';

type Props = {
  text: string
};

export function Summary(props: Props) {
  return (
    <div>
      <div className="node-wrapper">{props.text}</div>
    </div>
  );
}
