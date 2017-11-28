//@flow
import React from 'react';

type Props = {
  label: string,
  hint?: string
};

export const Label = ({ label, hint }: Props) => (
  <h2 className="type-title-dark">
    {label}
    <small className="caption-default">
      {hint}
    </small>
  </h2>
);
