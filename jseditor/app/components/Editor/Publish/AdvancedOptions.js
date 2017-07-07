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
    const value = {
      showAuthorInfo: isChecked
    };
    this.props.setPostMeta('author', value);
  }

  setCommentStatus = (e, isChecked) => {
    const value = {
      allow: isChecked,
      status: 'open',
    };
    this.props.setPostMeta('comment', value); 
  }

  render () {
    const { setPostMeta, setPostAuthor } = this.props;
    return(
      <div>
        <Subheader className="subheader">Avanzado</Subheader>
        <Divider className="divider" />
        <div>
          <Checkbox
            defaultChecked={false}
            label="Artículo especial"
            onCheck={(e, isChecked) => {setPostMeta('specialPost', isChecked);}}
          />
        </div>
        <div>
          <Checkbox
            defaultChecked={false}
            label="Tiene contenido sensible"
            onCheck={(e, isChecked) => {setPostMeta('sensitivePost', isChecked);}}
          />
        </div>
        <div>
          <Checkbox
            defaultChecked={false}
            label="Comentarios abiertos"
            onCheck={this.setCommentStatus}
          />
        </div>
        <div>
          <Checkbox
            defaultChecked={false}
            label="Mostrar fecha de publicación"
            onCheck={(e, isChecked) => {setPostMeta('showDate', isChecked);}}
          />
        </div>
        <div>
          <Checkbox
            defaultChecked={false}
            label="Mostrar botones de compartir en redes"
            onCheck={(e, isChecked) => {setPostMeta('showSocialShareButtons', isChecked);}}
          />
        </div>
        <div>
          <Checkbox
            defaultChecked={false}
            label="Mostrar author"
            onCheck={this.setShowAuthor}
          />
        </div>
        <div>
          <AutoComplete
            floatingLabelText="Autor"
            dataSource={this.state.userList}
            dataSourceConfig={{ text: 'display_name', value: 'id' }}
            openOnFocus={true}
            onNewRequest={(request) => {setPostAuthor(request.id);}}
          />
        </div>
      </div>
    );
  }
}