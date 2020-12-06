import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Tournament from '@/views/Tournament.vue'
import TournamentPlayers from '@/views/TournamentPlayers.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/:tournament/',
    name: 'tournament',
    component: Tournament,
  },
  {
    path: '/:tournament/players',
    name: 'tournament-players',
    component: TournamentPlayers,
  },
  {
    path: '/:tournament/player/:playerId/',
    name: 'tournament-player',
    component: Home,
  },
  {
    path: '/:tournament/categories',
    name: 'tournament-categories',
    component: Home,
  },
  {
    path: '/:tournament/categories/:categoryId/',
    name: 'tournament-category',
    component: Home,
  },
  {
    path: '/:tournament/tatamis',
    name: 'tournament-tatamis',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

