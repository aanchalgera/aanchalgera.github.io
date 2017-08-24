// @flow
import React, { Component } from 'react';
import { loadTags } from './lib/publishService';
import { filterTags } from './lib/publishHelpers';
import { UpdatedTags } from './lib/flowTypes';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

type Props = {
  blogUrl?: string,
  tags: Array<UpdatedTags>,
  updateParent: (data: Object) => void
};

export class Tags extends Component {
  props: Props;

  getTags = async (input: string): {} => {
    let tags = await loadTags(this.props.blogUrl, input);
    let updatedTags = filterTags(tags);
    return { options: updatedTags };
  };

  handleOnChange = (selectedTags: Array<UpdatedTags>) => {
    this.props.updateParent({ tags: selectedTags });
  };

  render() {
    return (
      <Select.Async
        placeholder="Etiquetas..."
        loadOptions={this.getTags}
        onChange={this.handleOnChange}
        multi={true}
        joinValues={true}
        value={this.props.tags}
        valueKey={'id'}
      />
    );
  }
}
