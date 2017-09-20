//@flow
import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { Category } from './lib/flowTypes';

type Props = {
  blogUrl: string,
  postCategories: Array<Category>,
  updateParent: (data: Object) => void,
  allCategories: Array<Category>
};

export const OtherCategories = ({
  allCategories,
  postCategories,
  updateParent
}: Props) => {
  return (
    <Select
      placeholder="Otras Categorías (opcional)"
      options={allCategories}
      onChange={input => {
        updateParent({ postCategories: input });
      }}
      multi={true}
      joinValues={true}
      value={postCategories}
      valueKey={'id'}
    />
  );
};
