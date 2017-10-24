//@flow
import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { loadAllCategories } from '../../../containers/lib/service.js';
import { filterCategories } from '../../../containers/lib/helpers.js';

type Props = {
  blogUrl: string,
  category: number,
  updateParent: (data: Object) => void
};

export default class Category extends Component {
  state = {
    categories: []
  };

  props: Props;

  async componentWillMount() {
    let categories = await loadAllCategories(
      this.props.blogUrl,
      this.props.postType
    );
    categories = filterCategories(categories);
    console.log(categories);
    this.setState({ categories: categories });
  }

  render() {
    return (
      <Select
        placeholder={'Categoría'}
        options={this.state.categories}
        onChange={input => {
          this.props.updateParent({ category: input ? input.id : null });
        }}
        value={this.props.category}
        valueKey={'id'}
      />
    );
  }
}
