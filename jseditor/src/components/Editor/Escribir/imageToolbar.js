import * as React from 'react';
import { OptionButton } from '.';
import { ActionDelete, EditorModeEdit } from 'material-ui/svg-icons';

type Props = {
  handleDelete: () => {},
  handleEdit: () => {}
};

export const ImageToolbar = ({ handleDelete, handleEdit }: Props) => (
  <div>
    <OptionButton
      Icon={ActionDelete}
      title="Editar"
      handleClick={handleDelete}
    />
    <OptionButton
      Icon={EditorModeEdit}
      title="Borrar"
      handleClick={handleEdit}
    />
  </div>
);
