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
    <div className="select-container">
      <span className="placeholder-text">Categoria</span>
      <Select
        placeholder="..."
        options={allCategories}
        onChange={input => {
          updateParent({ category: input ? input.id : null });
        }}
        value={category}
        valueKey={'id'}
        className="module-form-select"
        required={true}
      />
    </div>
  );
};
