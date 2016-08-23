import React from 'react';
import { Entity, RichUtils } from 'draft-js';

const TYPE = 'LINK';

export default class Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '' };
  }

  toggleLink(e) {
    e.preventDefault();
    const { editorState } = this.props;
    const selection = editorState.getSelection();

    if (selection.isCollapsed()) {
      return false;
    }

    const { url } = this.state;
    if (url == '') {
      const newUrl = prompt('Link?');
      if (!newUrl) {
        return false;
      }
      return this.setState({ url: newUrl }, () => {
        const entityKey = Entity.create(TYPE, 'MUTABLE', { url: newUrl });
        this.props.onToggle(RichUtils.toggleLink(editorState, selection, entityKey));
      });
    }

    this.setState({ url: '' }, () => {
      this.props.onToggle(RichUtils.toggleLink(editorState, selection, null));
    });

  }

  render() {
    return (
      <a
        className="fa fa-link"
        onClick={this.toggleLink.bind(this)}
      >
      </a>
    );
  }
}

export const LinkDecorator = {
  component: (props) => {
    const { url } = Entity.get(props.entityKey).getData();
    return (
      <a href={url}>
        {props.children}
      </a>
    );
  },

  strategy: (contentBlock, callback) => {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          Entity.get(entityKey).getType() === TYPE
        );
      },
      callback
    );
  }
};

