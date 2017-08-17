import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import { loadTags } from './lib/publishService';

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
    if (undefined !== tag.id) {
      let updatedTags = [...this.props.tags, {id: tag.id, name: tag.name}];
      this.props.updateParent({tags: updatedTags});
    }
  }

	render () {
    return (
      <AutoComplete
        dataSource={this.state.tags}
        dataSourceConfig={{text: 'name', value: 'id'}}
        onUpdateInput={this.handleUpdate}
        onNewRequest={this.handleNewRequest}
        openOnFocus={true}
        floatingLabelText="Etiquetas"
      />
    );
	}
}

export default Tags;