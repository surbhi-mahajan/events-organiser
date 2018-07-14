import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './routes';

Vue.use(Router);

const routerInstance = new Router({
  routes,
});


routerInstance.beforeEach((to, from, next) => {
  let redirectTo;
  if (to.name === 'login') {
    redirectTo = window.email ? '/' : redirectTo;
  } else {
    redirectTo = !window.email ? '/login' : redirectTo;
  }
  next(redirectTo);
});

export default routerInstance;
