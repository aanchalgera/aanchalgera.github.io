import React from 'react';
import moment from 'moment-timezone';
import { TextField, RaisedButton } from 'material-ui';
import Apps from 'material-ui/svg-icons/navigation/apps';
import { Row, Col } from 'react-flexbox-grid';

import configParams from '../../../config/configs';
import Scheduler from './Scheduler';

moment.tz.setDefault(configParams.timezone);

type Props = {
  base: PropTypes.object.isRequired,
  date: PropTypes.string
};

export class SchedulePost extends React.Component {
  state = {
    schedulerOpened: false
  };

  onChange = e => {
    this.updateParent({ publishedDate: e.target.value.trim() });
  };

  onPickSlot = (x, y, e) => {
    const currentTarget = e.currentTarget;
    if (['slot-current', 'slot-free'].includes(currentTarget.className)) {
      this.setState({
        schedulerOpened: false
      });
      this.props.updateParent({ publishedDate: currentTarget.dataset.date });
    }
  };

  toggleScheduler = e => {
    this.setState({
      schedulerOpened: !this.state.schedulerOpened,
      anchorEl: e.currentTarget
    });
  };

  render() {
    return (
      <Row style={{ marginBottom: '0px' }}>
        <Col xs>
          <TextField
            floatingLabelText="Fecha y hora"
            value={this.props.date}
            onChange={this.onChange}
          />
        </Col>
        <Col xs>
          <RaisedButton
            label={this.state.schedulerOpened ? 'CERRAR' : 'ELEGIR HUECO'}
            icon={<Apps />}
            onClick={this.toggleScheduler}
          />
        </Col>
        <Scheduler
          {...this.state}
          {...this.props}
          toggleScheduler={this.toggleScheduler}
          onPickSlot={this.onPickSlot}
        />
      </Row>
    );
  }
}
