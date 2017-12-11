//@flow
import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
type Props = {
  status: string,
  handleStatusUpdate: () => void
};

export const DraftButton = (props: Props) => {
  if ('draft' === props.status) {
    return null;
  }

  return (
    <RaisedButton
      label="Pasar A Borrador"
      primary
      onClick={props.handleStatusUpdate}
    />
  );
};
