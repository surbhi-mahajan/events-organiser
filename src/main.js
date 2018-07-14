"use strict";
import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './routes';
import store from './store';
import VeeValidate from 'vee-validate';
import './shared/filters';
Vue.use(VeeValidate);
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
//# sourceMappingURL=main.js.map