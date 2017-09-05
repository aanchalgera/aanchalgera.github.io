// @flow

import React from 'react';
import { Divider, Checkbox, Subheader, AutoComplete } from 'material-ui';

import { loadUsers } from './lib/publishService';
import { findById } from './lib/publishHelpers';

type User = { id: number, display_name: string };

type Props = {
  userId: number,
  blogUrl?: string,
  updateParent: (data: Object) => void,
  setPostMeta: (key: string, value: Object) => void,
  isSensitive: boolean,
  specialPost: boolean,
  postMeta: Object
};

export class AdvancedOptions extends React.Component {
  props: Props;

  state = {
    userList: [],
    currentUser: ''
  };

  componentDidMount() {
    this.init();
  }

  onNewRequest = (user: { id: number, display_name: string }) => {
    this.setState(
      { currentUser: user.display_name },
      this.props.updateParent({ userId: user.id })
    );
  };

  init = async () => {
    const users = await loadUsers(this.props.blogUrl);
    let user: User | void = findById(this.props.userId, users);
    this.setState({
      userList: users,
      currentUser: user ? user.display_name : ''
    });
  };

  setShowAuthor = (e: SyntheticEvent, isChecked: boolean) => {
    this.props.setPostMeta('author', {
      showAuthorInfo: isChecked
    });
  };

  setCommentStatus = (e: SyntheticEvent, isChecked: boolean) => {
    const checked = {
      allow: true,
      status: isChecked ? 'closed' : 'open'
    };
    this.props.setPostMeta('comment', checked);
  };

  handleSensitivePost = (e: SyntheticEvent, isSensitive: boolean) => {
    this.props.updateParent({ isSensitive: isSensitive });
  };

  handleSpecialPost = (e: SyntheticEvent, specialPost: boolean) => {
    this.props.updateParent({ specialPost: specialPost });
  };

  render() {
    const { setPostMeta, postMeta, specialPost, isSensitive } = this.props;

    return (
      <div>
        <Subheader className="subheader">Avanzado</Subheader>
        <Divider className="divider" />
        <Checkbox
          checked={specialPost}
          label="Artículo especial"
          onCheck={this.handleSpecialPost}
        />
        <Checkbox
          checked={isSensitive}
          label="Tiene contenido sensible"
          onCheck={this.handleSensitivePost}
        />
        <Checkbox
          checked={postMeta.comment.status === 'closed'}
          label="Comentarios abiertos"
          onCheck={this.setCommentStatus}
        />
        <Checkbox
          checked={postMeta.showDate}
          label="Mostrar fecha de publicación"
          onCheck={(e, isChecked) => {
            setPostMeta('showDate', isChecked);
          }}
        />
        <Checkbox
          checked={postMeta.showSocialShareButtons}
          label="Mostrar botones de compartir en redes"
          onCheck={(e, isChecked) => {
            setPostMeta('showSocialShareButtons', isChecked);
          }}
        />
        <Checkbox
          checked={postMeta.author.showAuthorInfo}
          label="Mostrar author"
          onCheck={this.setShowAuthor}
        />
        <AutoComplete
          searchText={this.state.currentUser}
          floatingLabelText="Autor"
          dataSource={this.state.userList}
          dataSourceConfig={{ text: 'display_name', value: 'id' }}
          openOnFocus={true}
          onNewRequest={this.onNewRequest}
          filter={AutoComplete.caseInsensitiveFilter}
          maxSearchResults={4}
        />
      </div>
    );
  }
}
