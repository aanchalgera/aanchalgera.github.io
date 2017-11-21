// @flow
import React, { PureComponent } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { loadTags } from '../lib/service';
import { filterTags } from 'lib/helpers';
import { UpdatedTags } from 'lib/flowTypes';

type Props = {
  siteUrl: string,
  updateParent: (data: Object) => void,
  tag: string,
  siteName: string
};

export default class Tag extends PureComponent<Props> {
  getTags = async (input: string): {} => {
    if ('' === input) {
      return null;
    }

    let tags = await loadTags(this.props.siteUrl, input, this.props.siteName);
    let updatedTags = filterTags(tags);
    return { options: updatedTags };
  };

  handleOnChange = (selectedTag: UpdatedTags) => {
    this.props.updateParent({ tag: selectedTag, category: null });
  };

  render() {
    return (
      <Select.Async
        placeholder="Tag"
        loadOptions={this.getTags}
        onChange={this.handleOnChange}
        valueKey={'id'}
        value={this.props.tag}
        ignoreAccents={false}
      />
    );
  }
}
