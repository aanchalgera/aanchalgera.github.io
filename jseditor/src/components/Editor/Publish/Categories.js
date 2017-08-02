import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { loadCategories } from './lib/publishService';
import { getCategories } from './lib/publishHelpers';
import 'prop-types';

const POST_TYPE = 'normal';

class Categories extends Component
{
  constructor (props) {
    super(props);
    this.state = {
      categories: []
    };
    this.setCategories();
  }

  setCategories = () => {
    loadCategories(this.props.blogUrl, POST_TYPE)
    .done((data) => {
      let categories = getCategories(data);
      this.setState({
        categories: categories
      });
    });
  }

  handleUpdate = (category) => {
    if (undefined !== category.id) {
      this.props.setCategory(category.id);
    }
  }

  render() {
    return (
      <AutoComplete
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
  blogUrl: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired
}

export default Categories;
