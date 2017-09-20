/* eslint-disable */
import React from 'react';
import { RichUtils } from 'draft-js';

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
      const newUrl = prompt('Link');
      if (!newUrl) {
        return false;
      }
      return this.setState({ url: newUrl }, () => {
        const entityKey = editorState
          .getCurrentContent()
          .createEntity(TYPE, 'MUTABLE', { url: newUrl })
          .getLastCreatedEntityKey();
        this.props.onToggle(
          RichUtils.toggleLink(editorState, selection, entityKey)
        );
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
        title="Link"
        onClick={this.toggleLink.bind(this)}
      />
    );
  }
}

export const LinkDecorator = {
  component: props => {
    const { contentState, entityKey, children } = props;
    const { url } = contentState.getEntity(entityKey).getData();
    return (
      <a href={url}>
        {children}
      </a>
    );
  },

  strategy: (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(character => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === TYPE
      );
    }, callback);
  }
};
