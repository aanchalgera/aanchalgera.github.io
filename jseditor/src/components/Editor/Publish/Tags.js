import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { loadTags } from './lib/publishService';
import { findById } from './lib/publishHelpers'

class Tags extends Component
{
  constructor (props) {	
    super(props);
    this.state = {
      tags: [],
    }
  }

  handleUpdate = (searchText) => {
    loadTags(this.props.blogUrl, searchText)
    .done((data) => {
      this.setState({tags: data});
    });
  }

  handleNewRequest = (tag) => {
    if (undefined !== tag.id && !this.isDuplicateEntry(tag)) {
      let updatedTags = [...this.props.tags, {id: Number(tag.id), name: tag.name}];
      this.props.updateParent({tags: updatedTags});
    } else {
      console.log('tag already selected');
    }
  }

  isDuplicateEntry = (tag) => {
    let tagAlreadyExist = findById(Number(tag.id), this.props.tags) ? true : false;
    return tagAlreadyExist;
  }

  render () {
    return (
      <AutoComplete
        dataSource={this.state.tags}
        dataSourceConfig={{text: 'name', value: 'id'}}
        onUpdateInput={this.handleUpdate}
        onNewRequest={this.handleNewRequest}
        openOnFocus={true}
        filter={AutoComplete.caseInsensitiveFilter}
        floatingLabelText="Etiquetas"
      />
    );
  }
}

export default Tags;