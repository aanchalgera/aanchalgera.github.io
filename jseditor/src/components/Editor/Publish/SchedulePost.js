import React from 'react';
import moment from 'moment-timezone';
import { TextField, RaisedButton } from 'material-ui';
import Apps from 'material-ui/svg-icons/navigation/apps';
import { Row, Col } from 'react-flexbox-grid';

import configParams from '../../../config/configs';
import Scheduler from './Scheduler';

moment.tz.setDefault(configParams.timezone);

export class SchedulePost extends React.Component {
  static defaultProps = {
    buttonDisabled: false
  };
  /*
  static propTypes = {
    base: PropTypes.object.isRequired,
    onInvalidDate: PropTypes.func.isRequired,
    onSchedule: PropTypes.func.isRequired,
    value: PropTypes.string,
    buttonDisabled: PropTypes.bool
  };
*/
  constructor(props) {
    super(props);
    this.state = {
      date: props.value,
      schedulerOpened: false,
      buttonDisabled: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ date: nextProps.value });
    }
  }

  onChange(e) {
    this.setState({ date: e.target.value.trim() });
  }

  onPickSlot = (x, y, e) => {
    const currentTarget = e.currentTarget;
    if (
      currentTarget.className === 'slot-current' ||
      currentTarget.className === 'slot-free'
    ) {
      this.setState({
        date: currentTarget.dataset.date,
        schedulerOpened: false
      });
    }
  };

  toggleScheduler = e => {
    this.setState({
      schedulerOpened: !this.state.schedulerOpened,
      anchorEl: e.currentTarget
    });
  };

  onSchedule() {
    const date = moment(this.state.date, 'DD/MM/YYYY HH:mm', true);
    if (!date.isValid() || date.isBefore(moment())) {
      return this.props.onInvalidDate();
    }
    this.setState({ buttonDisabled: true }, () => {
      this.props.onSchedule(this.state.date, () => {
        this.setState({ buttonDisabled: false });
      });
    });
  }

  render() {
    return (
      <Row style={{ marginBottom: '0px' }}>
        <Col xs>
          <TextField
            floatingLabelText="Fecha y hora"
            value={this.state.date}
            onChange={this.onChange.bind(this)}
          />
        </Col>
        <Col xs>
          <RaisedButton
            label={this.state.schedulerOpened ? 'CERRAR' : 'ELEGIR HUECO'}
            icon={<Apps />}
            onClick={this.toggleScheduler}
          />
        </Col>
        <Col>
          <RaisedButton
            label="PROGRAMAR"
            disabled={this.state.buttonDisabled || this.props.buttonDisabled}
            onClick={this.onSchedule.bind(this)}
            primary={true}
          />
        </Col>

        <Scheduler
          schedulerOpened={this.state.schedulerOpened}
          base={this.props.base}
          anchorEl={this.state.anchorEl}
          toggleScheduler={this.toggleScheduler}
          onPickSlot={this.onPickSlot}
          date={this.state.date}
        />
      </Row>
    );
  }
}
