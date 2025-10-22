import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../layouts/MainLayout.vue'),
      children: [{
        path: '/',
        name: 'Services',
        component: () => import('../pages/Services.vue'),
      }, {
        // state of modal in url, so user can share link to specific service
        path: '/:id',
        name: 'ServiceDetails',
        component: () => import('../pages/Services.vue'),
      }],
    },
  ],
})

export default router
