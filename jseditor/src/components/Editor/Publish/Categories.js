import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { loadCategories } from './lib/publishService';

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
    let categories = [];
    loadCategories(this.props.blogUrl, POST_TYPE)
    .done((data) => {
      for (let key in data) {
        let categoryGroup = data[key]['children'];
        if (undefined !== categoryGroup) {
          categoryGroup.forEach(function (category) {
            categories.push({categoryName: category['cat_name'], id: category['id']});
          });
        } else {
          let category = data[key];
          categories.push({id: category['id'], categoryName: category['name']});
        }
      }

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

export default Categories;
