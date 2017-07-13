import React from 'react';
import jquery from 'jquery';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import AutoComplete from 'material-ui/AutoComplete';

export default class Publish extends React.Component {

  static propTypes = {
    userId: React.PropTypes.number,
    blogUrl: React.PropTypes.string,
    setPostAuthor: React.PropTypes.func.isRequired,
    setPostMeta: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      currentUser: null
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    jquery.ajax({
      url: this.props.blogUrl + '/admin/users',
      crossDomain: true,
      dataType : 'json',
      xhrFields: {
        withCredentials: true
      }
    })
    .done((data) => {
      let user = data.users.filter(user => {
        return user.id == this.props.userId;
      });
      this.setState({
        userList: data.users,
        currentUser: user[0]
      });
    });
  }

  setShowAuthor = (e, isChecked) => {
    const checked = {
      showAuthorInfo: isChecked
    };
    this.props.setPostMeta('author', checked);
  }

  setCommentStatus = (e, isChecked) => {
    const checked = {
      allow: true,
      status: isChecked ? 'closed' : 'open',
    };
    this.props.setPostMeta('comment', checked); 
  }

  render () {
    const { setPostMeta, setPostAuthor, postMeta } = this.props;

    return(
      <div>
        <Subheader className="subheader">Avanzado</Subheader>
        <Divider className="divider" />
        <Checkbox
          checked={postMeta.specialPost}
          label="Artículo especial"
          onCheck={(e, isChecked) => {setPostMeta('specialPost', isChecked);}}
        />
        <Checkbox
          checked={postMeta.sensitivePost}
          label="Tiene contenido sensible"
          onCheck={(e, isChecked) => {setPostMeta('sensitivePost', isChecked);}}
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
          floatingLabelText="Autor"
          dataSource={this.state.userList}
          dataSourceConfig={{ text: 'display_name', checked: 'id' }}
          openOnFocus={true}
          onNewRequest={(request) => {setPostAuthor(request.id);}}
        />
      </div>
    );
  }
}