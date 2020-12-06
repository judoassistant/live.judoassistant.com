import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Tournament from '@/views/Tournament.vue'
import TournamentHome from '@/views/TournamentHome.vue'
import TournamentPlayers from '@/views/TournamentPlayers.vue'
import TournamentPlayer from '@/views/TournamentPlayer.vue'
import TournamentCategories from '@/views/TournamentCategories.vue'
import TournamentCategory from '@/views/TournamentCategory.vue'
import TournamentTatamis from '@/views/TournamentTatamis.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/:tournament',
    component: Tournament,
    children: [
      {
        path: '',
        name: 'tournament-home',
        component: TournamentHome,
      },
      {
        path: '/:tournament/players',
        name: 'tournament-players',
        component: TournamentPlayers,
      },
      {
        path: '/:tournament/player/:playerId/',
        name: 'tournament-player',
        component: TournamentPlayer,
      },
      {
        path: '/:tournament/categories',
        name: 'tournament-categories',
        component: TournamentCategories,
      },
      {
        path: '/:tournament/categories/:categoryId/',
        name: 'tournament-category',
        component: TournamentCategory,
      },
      {
        path: '/:tournament/tatamis',
        name: 'tournament-tatamis',
        component: TournamentTatamis,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

