import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import PropTypes from 'prop-types';

import { loadCategories } from './lib/publishService';
import { getCategories, findById } from './lib/publishHelpers';
import { Category } from './lib/flowTypes';

type Props = {
  category: number,
  blogUrl: string,
  setCategory: (data: Object) => void
};
const POST_TYPE = 'normal';

export class Categories extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentCategory: '',
      categories: []
    };
  }

  setCategories = async () => {
    let categories = await loadCategories(this.props.blogUrl, POST_TYPE);
    let updatedCategories = getCategories(categories);
    let currentCategory = findById(this.props.category, updatedCategories);
    this.setState({
      categories: updatedCategories,
      currentCategory: currentCategory ? currentCategory.label : ''
    });
  };

  handleUpdate = (category?: Category) => {
    if (undefined !== category.id) {
      this.props.setCategory(category.id);
    }
  };

  componentWillReceiveProps = (nextProps: Props) => {
    if (
      (undefined !== this.props.blogUrl) &
      (this.props.category !== nextProps.category)
    ) {
      this.setCategories();
    }
  };

  render() {
    return (
      <AutoComplete
        searchText={this.state.currentCategory}
        onNewRequest={this.handleUpdate}
        dataSource={this.state.categories}
        dataSourceConfig={{ text: 'label', value: 'id' }}
        openOnFocus={true}
        filter={AutoComplete.caseInsensitiveFilter}
        floatingLabelText="Categoria"
      />
    );
  }
}

Categories.propTypes = {
  category: PropTypes.number.isRequired,
  blogUrl: PropTypes.string,
  setCategory: PropTypes.func.isRequired
};
