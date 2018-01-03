//@flow
import * as React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { sitesConfig } from './lib/constants';

type Props = {
  site: string,
  updateParent: (data: Object) => void
};

const Sites = (props: Props) => {
  return (
    <Select
      options={sitesConfig}
      onChange={input => {
        props.updateParent({
          site: input ? input.title : '',
          category: null,
          tag: null
        });
      }}
      value={props.site}
      valueKey={'title'}
    />
  );
};

export default Sites;
