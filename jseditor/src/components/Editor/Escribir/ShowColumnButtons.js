//@flow
import React from 'react';
import { FlatButton } from 'material-ui';

type Props = {
  dataId: number,
  show2column?: boolean,
  show3column?: boolean,
  groupSections: (dataId: number, columns: number) => void,
};

export function ShowColumnButtons(props: Props) {
    const {
      dataId,
      groupSections,
      show2column,
      show3column
    } = props;

    return (
      <span>
        {show2column && (
          <FlatButton
            label="2 columna"
            onClick={() => groupSections(dataId, 2)}
            labelStyle={{ color: 'black' }}
          />
        )}
        {show3column && (
          <FlatButton
            label="3 columna"
            onClick={() => groupSections(dataId, 3)}
            labelStyle={{ color: 'black' }}
          />
        )}
      </span>
    );
}
