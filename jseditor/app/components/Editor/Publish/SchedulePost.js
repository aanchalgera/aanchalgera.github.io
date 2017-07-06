import React from 'react';
import moment from 'moment-timezone';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Apps from 'material-ui/svg-icons/navigation/apps';

import { grey900, white, pink400 } from 'material-ui/styles/colors';
import { Row, Col } from 'react-flexbox-grid';

var timeStamp = moment().format('X');
var currentMonth = moment().locale('es').format('MMMM');
let chooseSlotMsg = 'ELEGIR HUECO ';

class SchedulePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null
    };
  }

  openSlotWidget(ev) {
    ev.preventDefault();
    let visible = document.getElementById('publish-slots').style.display;
    document.getElementById('publish-slots').style.display = visible == 'none' ? 'block': 'none';
    chooseSlotMsg = 'Close';
    this.handleDatePickerText();
  }

  handleDatePickerText() {
    if (chooseSlotMsg == document.getElementById('toggle-publish-slots').text) {
      document.getElementById('toggle-publish-slots').text = 'ELEGIR HUECO';
    } else {
      document.getElementById('toggle-publish-slots').text = chooseSlotMsg;
    }
  }

  onPickSlot (ev) {
    let currentTarget = ev.currentTarget;
    if (ev.currentTarget.className == 'slot-past' || ev.currentTarget.className == 'slot-busy') return;
    let currentSlot = document.getElementsByClassName('slot-current');
    if (currentSlot.length > 0) {
      currentSlot[0].classList.add('slot-free');
      currentSlot[0].innerHTML = 'Libre';
      currentSlot[0].classList.remove('slot-current');
    }
    currentTarget.classList.remove('slot-free');
    currentTarget.innerHTML = 'Elegido';
    currentTarget.classList.add('slot-current');
    this.setState({
      date: ev.currentTarget.dataset.date
    });
    document.getElementById('publish-slots').style.display = 'none';
    this.handleDatePickerText();
  }

  onChange (ev) {
    ev.preventDefault();
    this.setState({date: ev.currentTarget.value});
  }

  render () {
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
        formattedDateTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY') + ' ' + j + ':00';
        if (timeStamp > moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('X')) {
          slot = 'slot-past';
          msg = 'Pasado';
        } else if (this.props.futureProgrammedPosts != undefined && this.props.futureProgrammedPosts[dateTime] != undefined) {
          slot = 'slot-busy';
          msg = 'Ocupado';
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
    return(
      <div>
        <Row>
          <Col xs={3}>
            <TextField
              floatingLabelText="Fecha y hora"
              value={this.state.date !== null ? this.state.date : this.props.value}
              onChange={this.onChange.bind(this)}
              style={{textColor: grey900}}
            />
          </Col>
          <Col xs={2}>
            <RaisedButton
              label="ELEGIR HUECO"
              icon={<Apps />}
              onClick={this.openSlotWidget.bind(this)}
              id="toggle-publish-slots"
            />
          </Col>
          <Col xs={1}>
            <RaisedButton
              label="PROGRAMAR"
              disabled={this.props.buttonDisabled}
              onClick={this.props.onSchedule.bind(this)}
              backgroundColor={pink400}
              labelColor={white}
            />
          </Col>
        </Row>
        <div className="publish-slots" id="publish-slots" style={{display: 'none'}}>
          <span className="hint">Selecciona un hueco, o pon la fecha que quieras en el cuadro de &lt;em&gt;fecha y hora&lt;/em&gt;</span>
          <table summary="Huecos disponibles para publicar">
            <thead>
              <tr id="table-head">
                <th><em>{currentMonth.toLowerCase()}</em></th>
                {tablehead}
              </tr>
            </thead>
            <tbody id="table-rows">
              {tablerows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default SchedulePost;
