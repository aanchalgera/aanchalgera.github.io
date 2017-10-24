// @flow
import React, { Component } from 'react';
import { loadTags } from '../Publish/lib/publishService';
import { filterTags } from '../Publish/lib/publishHelpers';
import { UpdatedTags } from '../Publish/lib/flowTypes';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

type Props = {
  blogUrl: string,
  updateParent: (data: Object) => void,
  tag: string
};

export default class Tag extends Component {
  props: Props;

  getTags = async (input: string): {} => {
    if ('' === input) {
      return null;
    }

    let tags = await loadTags(this.props.blogUrl, input);
    let updatedTags = filterTags(tags);
    return { options: updatedTags };
  };

  handleOnChange = (selectedTag: Array<UpdatedTags>) => {
    this.props.updateParent({ tag: selectedTag });
  };

  render() {
    return (
      <Select.Async
        placeholder="Tag"
        loadOptions={this.getTags}
        onChange={this.handleOnChange}
        valueKey={'id'}
        value={this.props.tag}
      />
    );
  }
}
