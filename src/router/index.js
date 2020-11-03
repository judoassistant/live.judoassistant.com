import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/:tournamentId/',
    name: 'Tournament',
    component: Home,
  },
  {
    path: '/:tournamentId/players',
    name: 'Players',
    component: Home,
  },
  {
    path: '/:tournamentId/categories',
    name: 'Categories',
    component: Home,
  },
  {
    path: '/:tournamentId/tatamis',
    name: 'Tatamis',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

