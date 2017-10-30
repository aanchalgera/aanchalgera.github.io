// @flow
import React, { PureComponent } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { loadTags } from '../lib/service';
import { filterTags } from 'lib/helpers';
import { UpdatedTags } from 'lib/flowTypes';

type Props = {
  siteUrl?: string,
  tags: Array<UpdatedTags>,
  updateParent: (data: Object) => void,
  siteName: string
};

export class Tags extends PureComponent {
  props: Props;

  getTags = async (input: string): {} => {
    if ('' === input) {
      return null;
    }

    let tags = await loadTags(this.props.siteUrl, input, this.props.siteName);
    let updatedTags = filterTags(tags);
    return { options: updatedTags };
  };

  handleOnChange = (selectedTags: Array<UpdatedTags>) => {
    this.props.updateParent({ tags: selectedTags });
  };

  render() {
    return (
      <div className="select-container">
        <span className="placeholder-text">Etiquetas</span>
        <Select.Async
          placeholder=""
          loadOptions={this.getTags}
          onChange={this.handleOnChange}
          multi={true}
          joinValues={true}
          value={this.props.tags}
          valueKey={'id'}
          className="module-form-select"
          ignoreAccents={false}
        />
      </div>
    );
  }
}
