export const routes = [
  {
    path: '/',
    component: () => import('../components/Layout/Layout.vue'),
    children: [
      {
        name: 'dashboard',
        path: '/',
        component: () => import('../components/Layout/Dashboard/Dashboard.vue'),
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../components/Layout/About/About.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login/Login.vue'),
  },
  {
    path: '*',
    redirect: '/',
  },
];
