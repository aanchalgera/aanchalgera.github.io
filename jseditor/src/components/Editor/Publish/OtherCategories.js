//@flow
import * as React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { CategoryType } from 'lib/flowTypes';

type Props = {
  blogUrl: string,
  postCategories: Array<CategoryType>,
  updateParent: (data: Object) => void,
  allCategories: Array<CategoryType>
};

export const OtherCategories = ({
  allCategories,
  postCategories,
  updateParent
}: Props) => {
  return (
    <div className="select-container">
      <span className="placeholder-text">Otras categorías (opcional)</span>
      <Select
        placeholder="..."
        options={allCategories}
        onChange={input => {
          updateParent({ postCategories: input });
        }}
        multi={true}
        joinValues={true}
        value={postCategories}
        valueKey={'id'}
        className="module-form-select"
      />
    </div>
  );
};
