//@flow
import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { blogConfig } from './lib/constants';

type Props = {
  site: string,
  updateParent: (data: Object) => void
};

export default class Sites extends React.PureComponent {
  props: Props;

  render() {
    return (
      <Select
        options={blogConfig}
        onChange={input => {
          this.props.updateParent({ site: input ? input.title : '' });
        }}
        value={this.props.site}
        valueKey={'title'}
      />
    );
  }
}
