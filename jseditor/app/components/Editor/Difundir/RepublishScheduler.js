import React from 'react';
import moment from 'moment-timezone';

moment.tz.setDefault(configParams.timezone);
var timeStamp = moment().format('X');
var currentMonth = moment().locale('es').format('MMMM');

class RepublishScheduler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().add(1, 'hours').format('DD/MM/YYYY HH:00'),
      schedulerOpened: false,
      buttonDisabled: false
    };
  }

  onChange(e) {
    this.setState({ date: e.target.value.trim() });
  }

  onPickSlot (ev) {
    let currentTarget = ev.currentTarget;
    if (currentTarget.className == 'slot-past' || currentTarget.className == 'slot-busy') {
      return;
    }
    this.setState({
      date: currentTarget.dataset.date,
      schedulerOpened: false
    });
  }

  toggleSlotScheduler() {
    this.setState({ schedulerOpened: !this.state.schedulerOpened });
  }

  onRepublishSchedule() {
    const date = moment(this.state.date, 'DD/MM/YYYY HH:mm', true);
    if (!date.isValid() || date.isBefore(moment())) {
      console.log('Invalid date');
      return;
    }
    this.setState({ buttonDisabled: true });
    this.props.onRepublishSchedule(this.state.date);
    this.setState({ buttonDisabled: false });
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
        formattedDateTime = moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY') + ' ' + (j < 10 ? `0${j}` : j) + ':00';
        if (timeStamp > moment(dateTime, 'YYYY-MM-DD HH:mm:ss').format('X')) {
          slot = 'slot-past';
          msg = 'Pasado';
        } else if (this.props.futureProgrammedPosts != undefined && this.props.futureProgrammedPosts[dateTime] != undefined) {
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
      <div id="publish-slots">
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
    );
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.date}
          onChange={this.onChange.bind(this)}
        />
        <button onClick={this.toggleSlotScheduler.bind(this)} >
          {this.state.schedulerOpened ? 'Close' : 'Select slot'}
        </button>
        <button
          disabled={this.state.buttonDisabled}
          onClick={this.onRepublishSchedule.bind(this)}
        >
          Schedule
        </button>
        {this.state.schedulerOpened && this.renderScheduler()}
      </div>
    );
  }
}

export default RepublishScheduler;
