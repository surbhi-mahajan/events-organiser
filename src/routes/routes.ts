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
              component: {
                name: 'CreatedEvents',
                render: (h: any) => h('router-view'),
              },
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
              component: {
                name: 'AcceptedEvents',
                render: (h: any) => h('router-view'),
              },
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
    path: '/signup',
    name: 'signup',
    component: () => import('../components/Signup/Signup.vue'),
  },
  {
    path: '*',
    redirect: '/',
  },
];
