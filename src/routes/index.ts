import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './routes';
import $store from '../store';

Vue.use(Router);

const whiteListedRoutes = [
  'login',
  'signup',
];
const routerInstance = new Router({
  routes,
});

routerInstance.beforeEach((to, from, next) => {
  let redirectTo;
  const userId = $store.getters.userDetails.id;

  if (to.name && whiteListedRoutes.includes(to.name)) {
    redirectTo = userId ? '/' : redirectTo;
  } else {
    redirectTo = !userId ? '/login' : redirectTo;
  }
  next(redirectTo);
});

export default routerInstance;
