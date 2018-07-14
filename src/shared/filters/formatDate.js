"use strict";
import Vue from 'vue';
import moment from 'moment-timezone';
Vue.filter('formatDate', (apoc, format = 'Do MMM YYYY hh:mm a') => {
    return apoc ? moment(apoc).format(format) : '';
});
//# sourceMappingURL=formatDate.js.map