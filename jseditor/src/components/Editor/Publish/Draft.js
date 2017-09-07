//@flow
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
type Props = {
  status: string,
  updateParent: (data: Object) => void
};

export const DraftButton = (props: Props) => {
  if ('draft' === props.status) {
    return null;
  }

  return (
    <RaisedButton
      label="Pasar A Borrador"
      primary={true}
      onClick={() => {
        props.updateParent({ status: 'draft' });
        props.handleStatusUpdate();
      }}
    />
  );
};
