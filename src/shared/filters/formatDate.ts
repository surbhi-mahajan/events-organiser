import Vue from 'vue';
import moment from 'moment-timezone';

Vue.filter('formatDate', (apoc: number, format: string = 'Do MMM YYYY hh:mm a'): string  => {
  return apoc ? moment(apoc).format(format) : '';
});
