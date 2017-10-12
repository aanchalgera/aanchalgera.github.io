// @flow
import configParams from '../../config/configs';
import moment from 'moment-timezone';

moment.tz.setDefault(configParams.timezone);

export const currentHour = () => {
  return moment().add(1, 'hours').format('DD/MM/YYYY HH:00');
};

export const currentTime = () => {
  return moment().format('DD/MM/YYYY H:mm');
};
