"use strict";
import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './routes';
Vue.use(Router);
const routerInstance = new Router({
    routes,
});
routerInstance.beforeEach((to, from, next) => {
    let redirectTo;
    const email = sessionStorage.getItem('email');
    if (to.name === 'login') {
        redirectTo = email ? '/' : redirectTo;
    }
    else {
        redirectTo = !email ? '/login' : redirectTo;
    }
    next(redirectTo);
});
export default routerInstance;
//# sourceMappingURL=index.js.map