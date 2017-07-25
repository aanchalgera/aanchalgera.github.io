import React from 'react';
import moment from 'moment-timezone';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Apps from 'material-ui/svg-icons/navigation/apps';
import { Row, Col } from 'react-flexbox-grid';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import Popover from 'material-ui/Popover';

var timeStamp = moment().format('X');
var currentMonth = moment().locale('es').format('MMMM');

const styles = {
  popover: {
    width: '50%',
    height: '50%'
  }
};

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
      this.setState({ date: nextProps.value });
    }
  }

  onChange(e) {
    this.setState({ date: e.target.value.trim() });
  }

  onPickSlot (x, y, e) {
    const currentTarget = e.currentTarget;
    if (currentTarget.className == 'slot-current' || currentTarget.className == 'slot-free') {
      this.setState({
        date: currentTarget.dataset.date,
        schedulerOpened: false
      });
    }
  }

  toggleScheduler(e) {
    this.setState({
      schedulerOpened: !this.state.schedulerOpened,
      anchorEl: e.currentTarget
    });
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
        tablehead.push(<TableHeaderColumn key={i}><strong>»{currentDay.toLowerCase()}</strong></TableHeaderColumn>);
      } else {
        var nextDayTimeStamp = moment.unix(timeStamp).add(i, 'day').locale('es').format('dddd DD');
        tablehead.push(<TableHeaderColumn key={i}>{nextDayTimeStamp.toLowerCase()}</TableHeaderColumn>);
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
          <TableRowColumn key={j + '-' + k} className={slot} data-date={formattedDateTime}>
            {msg}
          </TableRowColumn>
        );
      }
      tr = <TableRow key={j + '-' + k} className="even"><TableHeaderColumn>{j}</TableHeaderColumn>{td}</TableRow>;
      tablerows.push(tr);
      td = [];
    }

    return (
      <Popover
        open={this.state.schedulerOpened}
        anchorEl={this.state.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.toggleScheduler.bind(this)}
        style={styles.popover}
      >
        <div>
          <span className="hint">Selecciona un hueco, o pon la fecha que quieras en el cuadro de &lt;em&gt;fecha y hora&lt;/em&gt;</span>
          <Table summary="Huecos disponibles para publicar" onCellClick={this.onPickSlot.bind(this)}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn><em>{currentMonth.toLowerCase()}</em></TableHeaderColumn>
                {tablehead}
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {tablerows}
            </TableBody>
          </Table>
        </div>
      </Popover>
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
