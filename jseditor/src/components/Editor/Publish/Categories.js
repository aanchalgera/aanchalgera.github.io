//@flow
import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { Category } from 'lib/flowTypes';

type Props = {
  category: number,
  updateParent: (data: Object) => void,
  allCategories: Array<Category>,
  postType: string
};

export const Categories = ({
  allCategories,
  updateParent,
  category,
  postType
}: Props) => {
  return (
    <Select
      placeholder={'club' === postType ? 'Espacio de marca' : 'Categoría'}
      options={allCategories}
      onChange={input => {
        updateParent({ category: input ? input.id : null });
      }}
      value={category}
      valueKey={'id'}
      className="module-form-select"
    />
  );
};
