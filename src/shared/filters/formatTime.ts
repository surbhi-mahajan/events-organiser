import Vue from 'vue';
import moment from 'moment-timezone';

type IUnit = (
  'year' | 'years' | 'y' |
  'month' | 'months' | 'M' |
  'week' | 'weeks' | 'w' |
  'day' | 'days' | 'd' |
  'hour' | 'hours' | 'h' |
  'minute' | 'minutes' | 'm' |
  'second' | 'seconds' | 's' |
  'millisecond' | 'milliseconds' | 'ms'
);

Vue.filter('formatTime', (timeApoc: number, unit: IUnit = 'seconds'): string => {
  const duration = moment.duration(timeApoc, unit);
  const hours = duration.hours();
  const minutes = duration.minutes();
  let formattedDuration = '';

  if (hours) {
    formattedDuration += `${ hours }hr `;
  }
  if (minutes) {
    formattedDuration += `${ minutes }min`;
  }

  return formattedDuration || '0 min';
});
