//@flow
import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { Category } from './lib/flowTypes';

type Props = {
  blogUrl: string,
  category: Array<Category>,
  updateParent: (data: Object) => void,
  allCategories: Array<Category>
};

export class Categories extends Component {
  props: Props;

  handleOnChange = (input: Category) => {
    this.props.updateParent({ category: input.id });
  };

  render() {
    return (
      <Select
        placeholder="Categoria"
        options={this.props.allCategories}
        onChange={this.handleOnChange}
        value={this.props.category}
        valueKey={'id'}
      />
    );
  }
}
