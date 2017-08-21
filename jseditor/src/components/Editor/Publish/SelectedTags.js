import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import { Row, Col } from 'react-flexbox-grid';

export class SelectedTags extends Component {
  handleDelete = id => {
    let updatedTags = this.props.tags;
    const chipToDelete = updatedTags.map(chip => chip.id).indexOf(id);
    updatedTags.splice(chipToDelete, 1);
    this.props.updateParent({ tags: updatedTags });
  };

  render() {
    let tags = [];
    this.props.tags.map(tag => {
      let tagChip = (
        <Chip key={tag.id} onRequestDelete={() => this.handleDelete(tag.id)}>
          {tag.name}
        </Chip>
      );
      tags.push(tagChip);
    });

    return (
      <div>
        {tags}
      </div>
    );
  }
}
