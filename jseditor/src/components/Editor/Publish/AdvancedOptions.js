import React from 'react';
import { Divider, Checkbox, Subheader, AutoComplete } from 'material-ui';
import {loadUsers} from './lib/publishService';
import { findById } from './lib/publishHelpers';

export default class Publish extends React.Component {

  static propTypes = {
    userId: React.PropTypes.number,
    blogUrl: React.PropTypes.string,
    setPostAuthor: React.PropTypes.func.isRequired,
    handleSpecialPost: React.PropTypes.func.isRequired,
    handleSensitivePost: React.PropTypes.func.isRequired,
    setPostMeta: React.PropTypes.func.isRequired,
    isSensitive: React.PropTypes.bool.isRequired,
    specialPost: React.PropTypes.bool.isRequired,
  }

  state = {
    userList: [],
    currentUser: '',
  }

  componentDidMount() {
    this.init();
  }

  onNewRequest = (user) => {
    this.setState(
      {currentUser : user.display_name},
      this.props.setPostAuthor(user.id)
    );
  }

  init = () => {
    loadUsers(this.props.blogUrl)
    .done((data) => {
      let user = findById(this.props.userId, data.users);
      this.setState({
        userList: data.users,
        currentUser: user.display_name
      });
    });
  }

  setShowAuthor = (e, isChecked) => {
    this.props.setPostMeta('author', {
      showAuthorInfo: isChecked
    });
  }

  setCommentStatus = (e, isChecked) => {
    const checked = {
      allow: true,
      status: isChecked ? 'closed' : 'open',
    };
    this.props.setPostMeta('comment', checked);
  }

  render () {
    const {
      setPostMeta,
      handleSpecialPost,
      handleSensitivePost,
      postMeta,
      specialPost,
      isSensitive
    } = this.props;

    return(
      <div>
        <Subheader className="subheader">Avanzado</Subheader>
        <Divider className="divider" />
        <Checkbox
          checked={specialPost}
          label="Artículo especial"
          onCheck={handleSpecialPost}
        />
        <Checkbox
          checked={isSensitive}
          label="Tiene contenido sensible"
          onCheck={handleSensitivePost}
        />
        <Checkbox
          checked={postMeta.comment.status == 'closed'}
          label="Comentarios abiertos"
          onCheck={this.setCommentStatus}
        />
        <Checkbox
          checked={postMeta.showDate}
          label="Mostrar fecha de publicación"
          onCheck={(e, isChecked) => {setPostMeta('showDate', isChecked);}}
        />
        <Checkbox
          checked={postMeta.showSocialShareButtons}
          label="Mostrar botones de compartir en redes"
          onCheck={(e, isChecked) => {setPostMeta('showSocialShareButtons', isChecked);}}
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
        />
      </div>
    );
  }
}
