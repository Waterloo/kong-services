import { createRouter, createMemoryHistory } from 'vue-router'

/**
 * Creates a test router with the application's routes.
 * Useful for component tests that require routing functionality.
 */
export function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        name: 'home',
        component: { template: '<div>Home</div>' },
      },
      {
        path: '/:id',
        name: 'serviceDetails',
        component: { template: '<div>Details</div>' },
      },
    ],
  })
}
