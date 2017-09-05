//@flow
import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { Category } from './lib/flowTypes';

type Props = {
  blogUrl: string,
  otherCategories: Array<Category>,
  updateParent: (data: Object) => void,
  allCategories: Array<Category>
};

export const OtherCategories = ({
  allCategories,
  otherCategories,
  updateParent
}: Props) => {
  return (
    <Select
      placeholder="Otras Categorías..."
      options={allCategories}
      onChange={input => {
        updateParent({ otherCategories: input });
      }}
      multi={true}
      joinValues={true}
      value={otherCategories}
      valueKey={'id'}
    />
  );
};
