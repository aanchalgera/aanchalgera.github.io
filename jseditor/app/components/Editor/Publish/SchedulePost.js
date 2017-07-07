import React from 'react';
import moment from 'moment-timezone';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Apps from 'material-ui/svg-icons/navigation/apps';

import { grey900, white, pink400 } from 'material-ui/styles/colors';
import { Row, Col } from 'react-flexbox-grid';

var timeStamp = moment().format('X');
var currentMonth = moment().locale('es').format('MMMM');

class SchedulePost extends React.Component {
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
            <a className={slot} data-date={formattedDateTime} href="javascript:void(0)" onClick={this.props.onPickSlot.bind(this)}>
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
              value={this.props.value}
              onChange={this.props.onChange.bind(this)}
              style={{textColor: grey900}}
            />
          </Col>
          <Col xs={2}>
            <RaisedButton
              label="ELEGIR HUECO"
              icon={<Apps />}
              onClick={this.props.openSlotWidget.bind(this)}
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
