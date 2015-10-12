import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import jquery from 'jquery';
import moment from 'moment';

var timeStamp = moment().locale('es').format('X');
var nextDayTimeStamp = moment.unix(timeStamp).add(1, 'day').locale('es').format('dddd DD');
var currentMonth = moment().locale('es').format('MMMM');

class Publish extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fields: []
    };
  }
  componentDidMount(){
    this.init();
  }
  init(){
    window.mm = moment;
    this.postname = this.router.getCurrentParams().postname;
    if (undefined != this.postname) {
      this.props.base.fetch("posts/" + this.postname, {
        context: this,
        then(data){
          if (null != data) {
            this.setState({
              id : data.id,
              fields: data.sections != undefined ? data.sections : [],
              value: data.title,
            });
          }
        }
      });
    }
  }
  componentWillMount(){
    this.router = this.context.router;
  }
  onPublish(ev) {
    ev.preventDefault();
    var data = {
      id : this.postname,
      title : this.state.value,
      sections : this.state.fields,
      page: "publish"
    };
    data = JSON.stringify(data);
    var self = this;
    axios({
      url : 'http://52.19.39.251:81/parse',
      method: 'POST',
      data : data
    })
    .then(function (response) {
      console.log(response);
      self.saveData(response.data.response)
    })
    .catch(function (response) {
      console.log('error : ',response);
    });
  }
  saveData(content) {
    var data = {
      "categoryId":"-1",
      "post_title":this.state.value,
      "comment_status":"open",
      "post_type":"normal",
      "post_content":content,
      "post_abstract":"",
      "post_extended_title":"",
      "post_visibility":0,
      "posts_galleries":"",
      "postDate": "20/06/2016 22:48",
      "publish-region": ["ES", "US"],
      "postStatus": "future",
      "postRepostBlogNames": ["applesfera", "genbetadev"]
    }
    jquery.ajax({
      url: "http://testing.xataka.com/admin/posts.json",
      type: "POST",
      dataType: "json",
      data: data,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    })
    .success(function(result, status) {
      console.log(result, status);
    });
  }
  onChange(){}
  onPickSlot(ev) {
    console.log(ev);
  }
  openSlotWidget(ev) {
    ev.preventDefault();
    var visible = document.getElementById('publish-slots').style.display;
    document.getElementById('publish-slots').style.display = visible == 'none'? 'block': 'none';
  }
  render () {
    var tablehead = [];
    var tablerows = [];
    var td = [];
    var tr = '';
    for (var i = 0; i < 7; i++) {
      if (i == 0) {
        var currentDay = moment.unix(timeStamp).locale('es').format('dddd DD')
        tablehead.push(React.createElement('th', {}, React.createElement('strong', {}, "»"+currentDay.toLowerCase())));
      } else {
        var nextDayTimeStamp = moment.unix(timeStamp).add(i, 'day').locale('es').format('dddd DD');
        tablehead.push(React.createElement('th', {}, nextDayTimeStamp.toLowerCase()));
      }
    }
    for (var j = 7; j < 24; j++) {
      for (var k = 0; k < 7; k++) {
        td.push(React.createElement('td', {}, React.createElement('a', {className: 'slot-free', href: 'javascript:void(0)', onClick: this.onPickSlot.bind(this)}, "Libre")));
      }
      if (j % 2 == 0) {
        tr = React.createElement('tr', {className: 'even'}, React.createElement('th', {}, j), td);
      } else {
        tr = React.createElement('tr', {}, React.createElement('th', {}, j), td);
      }
      tablerows.push(React.createElement('div',{},tr));
      td = [];
    }
    window.aa = tablehead;
    window.ab = tablerows;
    return(
      <div>
        <div className="preview-nav">
          <Link to={"/edit/post/"+this.postname} className="btn btn-primary">Back to post</Link>
          <a className="btn btn-primary" href="#" onClick={this.onPublish.bind(this)}>Publish</a>
        </div>
        <form className="post-publish">
          <h3>Publish your post</h3>
          <div className="form-group">
            <fieldset className="date-time">
           		<legend>Date and time</legend>
              <p className="non-published-state">
                <input type="text" size="20" value={moment.unix(timeStamp).format('DD/MM/YYYY HH:mm')} onChange={this.onChange()} name="postDate" id="publish-date-old" />
                <a className="btn btn-primary" href="#" id="toggle-publish-slots" onClick={this.openSlotWidget.bind(this)}>Select now</a>
                <a className="btn btn-warning" href="#" id="schedule-future-top">Schedule</a>
              </p>
              <div className="publish-slots" id="publish-slots" style={{display: 'none'}}>
                <span className="hint">Selecciona un hueco, o pon la fecha que quieras en el cuadro de &lt;em&gt;fecha y hora&lt;/em&gt;</span>
                <table summary="Huecos disponibles para publicar">
                  <thead>
                    <tr id="table-head">
                      <th><em>{currentMonth.toLowerCase()}</em></th>
                      {tablehead.map(function(result) {
                        return result;
                      })}
                    </tr>
                  </thead>
                  <tbody id="table-rows">
                    {tablerows.map(function(result) {
                      return result;
                    })}
                  </tbody>
            </table>
            </div>
           </fieldset>
          </div>
          <div className="form-group">
            <fieldset className="country">
           		<legend>Countries</legend>
              <select multiple="multiple" className="form-control" style={{minHeight:"150px"}}>
                <option value="ALL">All</option>
                <option value="ES">Spain</option>
                <option value="MX">Mexico</option>
                <option value="PE">Peru</option>
                <option value="US">United States</option>
                <option value="CO">Colombia</option>
            </select>
        </fieldset>
          </div>
        </form>
      </div>
    )

  }
}
Publish.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Publish;
