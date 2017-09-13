//@flow
import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { Category } from './lib/flowTypes';

type Props = {
  blogUrl: string,
  category: number,
  updateParent: (data: Object) => void,
  allCategories: Array<Category>
};

export const Categories = ({
  allCategories,
  updateParent,
  category
}: Props) => {
  return (
    <Select
      placeholder="Categoria"
      options={allCategories}
      onChange={input => {
        updateParent({ category: input ? input.id : null });
      }}
      value={category}
      valueKey={'id'}
    />
  );
};
