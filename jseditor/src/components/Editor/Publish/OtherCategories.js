//@flow
import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { loadCategories } from './lib/publishService';
import { getCategories } from './lib/publishHelpers';
import { Category } from './lib/flowTypes';

type Props = {
  blogUrl?: string,
  otherCategories: Array<Category>,
  updateParent: (data: Object) => void
};

const POST_TYPE = 'normal';

export class OtherCategories extends Component {
  props: Props;
  state = {
    categories: []
  };

  setCategories = async () => {
    let categories = await loadCategories(this.props.blogUrl, POST_TYPE);
    let updatedCategories = await getCategories(categories);
    this.setState({ categories: updatedCategories });
  };

  handleOnChange = (input: Array<Category>) => {
    this.props.updateParent({ otherCategories: input });
  };

  componentWillMount = () => {
    this.setCategories();
  };

  render() {
    return (
      <Select
        placeholder="Otras Categorías..."
        options={this.state.categories}
        onChange={this.handleOnChange}
        multi={true}
        joinValues={true}
        value={this.props.otherCategories}
        valueKey={'id'}
      />
    );
  }
}
