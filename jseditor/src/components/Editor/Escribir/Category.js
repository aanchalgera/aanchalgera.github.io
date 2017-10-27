//@flow
import React, { PureComponent } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { loadAllCategories } from 'lib/service.js';
import { filterCategories } from 'lib/helpers.js';

type Props = {
  siteUrl: string,
  category: number,
  updateParent: (data: Object) => void,
  postType: string,
  siteName: string
};

export default class Category extends PureComponent {
  constructor(props: Props) {
    super();
    this.props = props;
    if (props.siteName) {
      this.setCategories(props.siteName);
    }
  }

  state = {
    categories: []
  };

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.siteName !== this.props.siteName) {
      this.setCategories(nextProps.siteName);
    }
  }

  async setCategories(siteName: string) {
    let categories = await loadAllCategories(
      this.props.siteUrl,
      this.props.postType,
      siteName
    );
    categories = filterCategories(categories);
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
