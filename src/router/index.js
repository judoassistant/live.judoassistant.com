import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Tournament from '@/views/Tournament.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/:tournament/',
    name: 'tournament',
    component: Tournament,
  },
  {
    path: '/:tournament/players',
    name: 'players',
    component: Home,
  },
  {
    path: '/:tournament/player/:playerId/',
    name: 'player',
    component: Home,
  },
  {
    path: '/:tournament/categories',
    name: 'categories',
    component: Home,
  },
  {
    path: '/:tournament/categories/:categoryId/',
    name: 'category',
    component: Home,
  },
  {
    path: '/:tournament/tatamis',
    name: 'tatamis',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

