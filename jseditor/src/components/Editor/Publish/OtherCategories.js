//@flow
import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { Category } from './lib/flowTypes';

type Props = {
  blogUrl: string,
  otherCategories: Array<Category>,
  updateParent: (data: Object) => void,
  allCategories: Array<Category>
};

export class OtherCategories extends Component {
  props: Props;

  handleOnChange = (input: Array<Category>) => {
    this.props.updateParent({ otherCategories: input });
  };

  render() {
    return (
      <Select
        placeholder="Otras Categorías..."
        options={this.props.allCategories}
        onChange={this.handleOnChange}
        multi={true}
        joinValues={true}
        value={this.props.otherCategories}
        valueKey={'id'}
      />
    );
  }
}
