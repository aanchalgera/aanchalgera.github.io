import React from 'react';
import moment from 'moment-timezone';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Apps from 'material-ui/svg-icons/navigation/apps';
import { Row, Col } from 'react-flexbox-grid';

var timeStamp = moment().format('X');
var currentMonth = moment().locale('es').format('MMMM');

class SchedulePost extends React.Component {
  static defaultProps = {
    buttonDisabled: false
  };

  static propTypes = {
    base: React.PropTypes.object.isRequired,
    onInvalidDate: React.PropTypes.func.isRequired,
    onSchedule: React.PropTypes.func.isRequired,
    value: React.PropTypes.string,
    buttonDisabled: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      date: props.value,
      schedulerOpened: false,
      buttonDisabled: true,
      futureProgrammedPosts: []
    };
  }

  componentDidMount() {
    this.props.base.fetch('posts', {
      context: this,
      asArray: true,
      queries: {
        orderByChild: 'status',
        equalTo: 'publish'
      },
      then(data) {
        if (data != null) {
          let scheduledPosts = {};
          data.forEach(result => {
            let formatDate = moment(result.publishData.postDate, 'DD/MM/YYYY H:00:00').format('YYYY-MM-DD H:00:00');
            scheduledPosts[formatDate] = {
              id: result.id,
              status: result.status,
              date: result.date,
              title : result.title
            };
          });

          this.setState({
            futureProgrammedPosts: scheduledPosts,
            buttonDisabled: false
          });
        }
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      if (!this.state.date && nextProps.value) {
        this.setState({ date: nextProps.value });
      }
    }
  }

  onChange(e) {
    this.setState({ date: e.target.value.trim() });
  }

  onPickSlot (e) {
    const currentTarget = e.currentTarget;
    if (currentTarget.className == 'slot-past' || currentTarget.className == 'slot-busy') {
      return;
    }
    this.setState({
      date: currentTarget.dataset.date,
      schedulerOpened: false
    });
  }

  toggleScheduler() {
    this.setState({ schedulerOpened: !this.state.schedulerOpened });
  }

  onSchedule() {
    const date = moment(this.state.date, 'DD/MM/YYYY HH:mm', true);
    if (!date.isValid() || date.isBefore(moment())) {
      return this.props.onInvalidDate();
    }
    this.setState({ buttonDisabled : true }, () => {
      this.props.onSchedule(this.state.date, () => {
        this.setState({ buttonDisabled : false });
      });
    });
  }

  renderScheduler() {
    var tablehead = [], tablerows = [];
    var td = [];
    var tr = '';
    var slot, msg, dateTime, formattedDateTime;
    for (var i = 0; i < 7; i++) {
      if (i == 0) {
        var currentDay = moment.unix(timeStamp).locale('es').format('dddd DD');
        tablehead.push(<th key={i}><strong>»{currentDay.toLowerCase()}</strong></th>);
      } else {
        var nextDayTimeStamp = moment.unix(timeStamp).add(i, 'day').locale('es').format('dddd DD');
        tablehead.push(<th key={i}>{nextDayTimeStamp.toLowerCase()}</th>);
      }
    }
    for (var j = 7; j < 24; j++) {
      for (var k = 0; k < 7; k++) {
        slot = '';
        msg = '';
        dateTime = moment.unix(timeStamp).add(k, 'day').format('YYYY-MM-DD') + ' ' + j + ':00:00';
        formattedDateTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY') + ' ' +  (j < 10 ? `0${j}` : j) + ':00';
        if (timeStamp > moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('X')) {
          slot = 'slot-past';
          msg = 'Pasado';
        } else if (this.state.futureProgrammedPosts != undefined && this.state.futureProgrammedPosts[dateTime] != undefined) {
          slot = 'slot-busy';
          msg = 'Ocupado';
        } else if (this.state.date == formattedDateTime) {
          slot = 'slot-current';
          msg = 'Elegido';
        } else {
          slot = 'slot-free';
          msg = 'Libre';
        }
        td.push(
          <td key={j + '-' + k}>
            <a className={slot} data-date={formattedDateTime} href="javascript:void(0)" onClick={this.onPickSlot.bind(this)}>
              {msg}
            </a>
          </td>
        );
      }
      if (j % 2 == 0) {
        tr = <tr key={j + '-' + k} className="even"><th>{j}</th>{td}</tr>;
      } else {
        tr = <tr key={j + '-' + k}><th>{j}</th>{td}</tr>;
      }
      tablerows.push(tr);
      td = [];
    }

    return (
      <div>
        <span className="hint">Selecciona un hueco, o pon la fecha que quieras en el cuadro de &lt;em&gt;fecha y hora&lt;/em&gt;</span>
        <table summary="Huecos disponibles para publicar">
          <thead>
            <tr>
              <th><em>{currentMonth.toLowerCase()}</em></th>
              {tablehead}
            </tr>
          </thead>
          <tbody>
            {tablerows}
          </tbody>
        </table>
      </div>
    );
  }

  render () {
    return(
      <div>
        <Row>
          <Col xs={3}>
            <TextField
              floatingLabelText="Fecha y hora"
              value={this.state.date}
              onChange={this.onChange.bind(this)}
            />
          </Col>
          <Col xs={2}>
            <RaisedButton
              label={this.state.schedulerOpened ? 'CERRAR' : 'ELEGIR HUECO'}
              icon={<Apps />}
              onClick={this.toggleScheduler.bind(this)}
            />
          </Col>
          <Col xs={1}>
            <RaisedButton
              label="PROGRAMAR"
              disabled={this.state.buttonDisabled || this.props.buttonDisabled}
              onClick={this.onSchedule.bind(this)}
              primary={true}
            />
          </Col>  
        </Row>
        {this.state.schedulerOpened && this.renderScheduler()}
      </div>
    );
  }
}

export default SchedulePost;
