import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import { Row, Col } from 'react-flexbox-grid';

export default class SelectedTags extends Component
{
  handleDelete = (id) => {
    delete this.props.tags[id];
    this.prop.updateParent({tags: this.props.tags});
  }

  render () {
    let tags = [];
    this.props.tags.map((tag) => {
      let tagChip = (
        <Chip
        key={tag.id}
        onRequestDelete={() => this.handleDelete(tag.key)}
        >
          {tag.name}
        </Chip>
      );
      tags.push(tagChip);
    });

    return (
      <Row>
        {tags}
      </Row>
    );
  }
}
