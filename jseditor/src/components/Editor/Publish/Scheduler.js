import React from 'react';
import Popover from 'material-ui/Popover';
import moment from 'moment-timezone';
import localization from 'moment/locale/es';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import { getScheduledPosts } from './lib/publishService';
import configParams from '../../../config/configs.js';

moment.tz.setDefault(configParams.timezone);
moment().locale('es', localization);

const styles = {
  popover: {
    width: '50%',
    height: '50%'
  }
};
const HINT =
  'Selecciona un hueco, o pon la fecha que quieras en el cuadro de <em>fecha y hora</em>';
const timeStamp = moment().format('X');
const currentMonth = moment().format('MMMM');

export default class Scheduler extends React.Component {
  state = {
    scheduledPosts: []
  };

  componentWillMount() {
    this.init();
  }

  async init() {
    const data = await getScheduledPosts(this.props.base);
    let scheduledPosts = {};
    data.forEach(result => {
      let formatDate = result.publishData.postDate;
      scheduledPosts[formatDate] = {
        id: result.id,
        status: result.status,
        date: result.date,
        title: result.title
      };
    });

    this.setState({ scheduledPosts });
    this.tablehead = this.getHeader();
  }

  getHeader() {
    let tablehead = [];
    for (let i = 0; i < 7; i++) {
      let nextDay = moment.unix(timeStamp).add(i, 'day').format('dddd DD');
      tablehead.push(
        <TableHeaderColumn key={i}>
          {nextDay.toLowerCase()}
        </TableHeaderColumn>
      );
    }
    return tablehead;
  }

  getRows() {
    let tablerows = [];
    let td = [],
      tr = '';
    let slot, msg, dateTime;
    for (var j = 7; j < 24; j++) {
      for (var k = 0; k < 7; k++) {
        dateTime =
          moment.unix(timeStamp).add(k, 'day').format('DD/MM/YYYY') +
          ' ' +
          j +
          ':00';

        if (timeStamp > moment(dateTime, 'DD/MM/YYYY H:mm').format('X')) {
          slot = 'slot-past';
          msg = 'Pasado';
        } else if (this.props.date === dateTime) {
          slot = 'slot-current';
          msg = 'Elegido';
        } else if (this.state.scheduledPosts[dateTime] !== undefined) {
          slot = 'slot-busy';
          msg = 'Ocupado';
        } else {
          slot = 'slot-free';
          msg = 'Libre';
        }
        td.push(
          <TableRowColumn
            key={j + '-' + k}
            className={slot}
            data-date={dateTime}
          >
            {msg}
          </TableRowColumn>
        );
      }
      tr = (
        <TableRow key={j + '-' + k}>
          <TableHeaderColumn>
            {j}
          </TableHeaderColumn>
          {td}
        </TableRow>
      );
      tablerows.push(tr);
      td = [];
    }
    return tablerows;
  }

  render() {
    return (
      <Popover
        open={this.props.schedulerOpened}
        anchorEl={this.props.anchorEl}
        onRequestClose={this.props.toggleScheduler}
        style={styles.popover}
      >
        <span className="hint">
          {HINT}
        </span>
        <Table onCellClick={this.props.onPickSlot}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>
                <em>
                  {currentMonth.toLowerCase()}
                </em>
              </TableHeaderColumn>
              {this.tablehead}
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.getRows()}
          </TableBody>
        </Table>
      </Popover>
    );
  }
}
