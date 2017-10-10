// @flow

import React from 'react';
import { Checkbox, AutoComplete } from 'material-ui';

import { loadUsers } from './lib/publishService';
import { findById } from './lib/publishHelpers';
import { Label } from './Label';
import { Check } from '../../../containers/lib/check';

type User = { id: number, display_name: string };

type Props = {
  userId: number,
  blogUrl?: string,
  updateParent: (data: Object) => void,
  setPostMeta: (key: string, value: Object) => void,
  isSensitive: boolean,
  specialPost: boolean,
  postMeta: Object,
  commentStatus: string,
  userRole: string,
  postType: string
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
    const commentStatus = isChecked ? 'closed' : 'open';
    this.props.updateParent({ commentStatus: commentStatus });
  };

  handleSensitivePost = (e: SyntheticEvent, isSensitive: boolean) => {
    this.props.updateParent({ isSensitive: isSensitive });
  };

  handleSpecialPost = (e: SyntheticEvent, specialPost: boolean) => {
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
        <Check
          userRole={this.props.userRole}
          postType={this.props.postType}
          childName="ShowDate"
        >
          <Checkbox
            checked={postMeta.showDate}
            label="Mostrar fecha de publicación"
            onCheck={(e, isChecked) => {
              setPostMeta('showDate', isChecked);
            }}
            className="layout-line-form"
          />
        </Check>
        <Check
          userRole={this.props.userRole}
          postType={this.props.postType}
          childName="ShowSocialShareButtons"
        >
          <Checkbox
            checked={postMeta.showSocialShareButtons}
            label="Mostrar botones de compartir en redes"
            onCheck={(e, isChecked) => {
              setPostMeta('showSocialShareButtons', isChecked);
            }}
            className="layout-line-form"
          />
        </Check>
        <Check
          userRole={this.props.userRole}
          postType={this.props.postType}
          childName="FBIA"
        >
          <Checkbox
            checked={iaVisibility}
            label="Publish as FBIA"
            onCheck={(e, isChecked) => {
              updateParent({ iaVisibility: isChecked });
            }}
            className="layout-line-form"
          />
        </Check>
        <Check
          userRole={this.props.userRole}
          postType={this.props.postType}
          childName="AMP"
        >
          <Checkbox
            checked={ampVisibility}
            label="Publish as AMP"
            onCheck={(e, isChecked) => {
              updateParent({ ampVisibility: isChecked });
            }}
            className="layout-line-form"
          />
        </Check>
        <Check
          userRole={this.props.userRole}
          postType={this.props.postType}
          childName="ShowSocialShareButtons"
        >
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
          openOnFocus={true}
          onNewRequest={this.onNewRequest}
          filter={AutoComplete.caseInsensitiveFilter}
          maxSearchResults={2}
        />
      </div>
    );
  }
}
