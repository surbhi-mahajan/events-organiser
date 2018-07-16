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
        name: 'about',
        path: '/about',
        component: () => import('../components/Layout/About/About.vue'),
      },
      {
          name: 'create',
          path: '/create',
          component: () => import('../components/Layout/Create/Create.vue'),
      },
      {
          name: 'events',
          path: '/events',
          redirect: { name: 'events.created' },
          component: () => import('../components/Layout/Events/Events.vue'),
          children: [
            {
              name: 'events.created',
              path: 'created',
              redirect: { name: 'events.created.active' },
              children: [
                {
                  name: 'events.created.active',
                  path: 'active',
                  component: () => import('../components/Layout/Events/Created/CreatedActiveEvents.vue'),
                },
                {
                  name: 'events.created.expired',
                  path: 'expired',
                  component: () => import('../components/Layout/Events/Created/CreatedExpiredEvents.vue'),
                },
              ],
            },
            {
              name: 'events.accepted',
              path: 'accepted',
              redirect: { name: 'events.accepted.active' },
              children: [
                {
                  name: 'events.accepted.active',
                  path: 'active',
                  component: () => import('../components/Layout/Events/Accepted/AcceptedActiveEvents.vue'),
                },
                {
                  name: 'events.accepted.expired',
                  path: 'expired',
                  component: () => import('../components/Layout/Events/Accepted/AcceptedExpiredEvents.vue'),
                },
              ],
            },
          ],
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
