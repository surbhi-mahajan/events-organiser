import Vue from 'vue';
import moment from 'moment-timezone';

Vue.filter('formatDate', (apoc: number, format: string = 'DD MMM YYYY hh:mm a'): string  => {
  return apoc ? moment.unix(apoc).format(format) : '';
});
