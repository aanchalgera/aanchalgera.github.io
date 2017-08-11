import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import PropTypes from 'prop-types';

import { loadCategories } from './lib/publishService';
import { getCategories, findById } from './lib/publishHelpers';

const POST_TYPE = 'normal';

class Categories extends Component
{
  constructor (props) {
    super(props);
    this.state = {
      currentCategory: '',
      categories: [],
    };
  }

  setCategories = () => {
    loadCategories(this.props.blogUrl, POST_TYPE)
    .done((data) => {
      let categories = getCategories(data);
      let currentCategory = findById(this.props.category, categories);
      this.setState(() => {
        return {
          categories: categories,
          currentCategory: currentCategory ? currentCategory.categoryName : ''
        }
      });
    });
  }

  handleUpdate = (category) => {
    if (undefined !== category.id) {
      this.props.setCategory(category.id)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (undefined !== this.props.blogUrl & this.props.category !== nextProps.category) {
      this.setCategories();
    }
  }

  render() {
    return (
      <AutoComplete
        searchText={this.state.currentCategory}
        onNewRequest={this.handleUpdate}
        dataSource={this.state.categories}
        dataSourceConfig={{text: 'categoryName', value: 'id'}}
        openOnFocus={true}
        floatingLabelText="Categoria"
      />
    );
  }
}

Categories.propTypes = {
  category: PropTypes.number.isRequired,
  blogUrl: PropTypes.string,
  setCategory: PropTypes.func.isRequired,
}

export default Categories;
