import '@babel/polyfill';
import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './routes';
import store from './store';
import VeeValidate from 'vee-validate';
import GSignInButton from 'vue-google-signin-button';
import './shared/filters';

Vue.use(GSignInButton);
Vue.use(VeeValidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
