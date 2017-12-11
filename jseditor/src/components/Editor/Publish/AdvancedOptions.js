// @flow
import * as React from 'react';
import { Checkbox, AutoComplete } from 'material-ui';

import { loadUsers } from './lib/publishService';
import { findById } from 'lib/helpers';
import { Label } from './Label';
import { Check } from 'lib/check';
import { User, InputEvent } from 'lib/flowTypes';

type Props = {
  userId: number,
  blogUrl?: string,
  updateParent: (data: Object) => void,
  setPostMeta: (key: string, value: Object) => void,
  isSensitive: boolean,
  specialPost: boolean,
  postMeta: Object,
  commentStatus: string,
  ampVisibility: boolean,
  iaVisibility: boolean
};

type State = {
  userList: Array<User>,
  currentUser: string
};

export class AdvancedOptions extends React.PureComponent<Props, State> {
  state = {
    userList: [],
    currentUser: ''
  };

  componentDidMount() {
    this.init();
  }

  onNewRequest = (user: User) => {
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

  setShowAuthor = (e: InputEvent, isChecked: boolean) => {
    this.props.setPostMeta('author', {
      showAuthorInfo: isChecked
    });
  };

  setCommentStatus = (e: InputEvent, isChecked: boolean) => {
    const commentStatus = isChecked ? 'closed' : 'open';
    this.props.updateParent({ commentStatus: commentStatus });
  };

  handleSensitivePost = (e: InputEvent, isSensitive: boolean) => {
    this.props.updateParent({ isSensitive: isSensitive });
  };

  handleSpecialPost = (e: InputEvent, specialPost: boolean) => {
    this.props.updateParent({ specialPost: specialPost });
  };

  render() {
    const {
      setPostMeta,
      postMeta,
      isSensitive,
      commentStatus,
      updateParent,
      ampVisibility,
      iaVisibility
    } = this.props;

    return (
      <div>
        <Label label="Avanzado" />
        {/*<Checkbox
          checked={specialPost}
          label="Artículo especial"
          onCheck={this.handleSpecialPost}
          className="layout-line-form"
        /> */}
        <Checkbox
          checked={isSensitive}
          label="Tiene contenido sensible"
          onCheck={this.handleSensitivePost}
          className="layout-line-form"
        />
        <Checkbox
          checked={commentStatus === 'closed'}
          label="Comentarios abiertos"
          onCheck={this.setCommentStatus}
          className="layout-line-form"
        />
        <Check childName="ShowDate">
          <Checkbox
            checked={postMeta.showDate}
            label="Mostrar fecha de publicación"
            onCheck={(e, isChecked) => {
              setPostMeta('showDate', isChecked);
            }}
            className="layout-line-form"
          />
        </Check>
        <Check childName="ShowSocialShareButtons">
          <Checkbox
            checked={postMeta.showSocialShareButtons}
            label="Mostrar botones de compartir en redes"
            onCheck={(e, isChecked) => {
              setPostMeta('showSocialShareButtons', isChecked);
            }}
            className="layout-line-form"
          />
        </Check>
        <Check childName="FBIA">
          <Checkbox
            checked={iaVisibility}
            label="Publicar como Instant Article en Facebook"
            onCheck={(e, isChecked) => {
              updateParent({ iaVisibility: isChecked });
            }}
            className="layout-line-form"
          />
        </Check>
        <Check childName="AMP">
          <Checkbox
            checked={ampVisibility}
            label="Publicar versión para AMP de Google"
            onCheck={(e, isChecked) => {
              updateParent({ ampVisibility: isChecked });
            }}
            className="layout-line-form"
          />
        </Check>
        <Check childName="ShowSocialShareButtons">
          <Checkbox
            checked={postMeta.author.showAuthorInfo}
            label="Mostrar author"
            onCheck={this.setShowAuthor}
            className="layout-line-form"
          />
        </Check>
        <AutoComplete
          searchText={this.state.currentUser}
          floatingLabelText="Autor"
          dataSource={this.state.userList}
          dataSourceConfig={{ text: 'display_name', value: 'id' }}
          openOnFocus
          onNewRequest={this.onNewRequest}
          filter={AutoComplete.caseInsensitiveFilter}
          maxSearchResults={2}
          onUpdateInput={searchText => {
            this.setState({ currentUser: searchText });
          }}
        />
      </div>
    );
  }
}
