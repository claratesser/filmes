import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/filmes',
    name: 'Movies',
    component: () => import('../views/MoviesView.vue'),
  },
  {
    path: '/tv',
    name: 'TV',
    component: () => import('../views/TvView.vue'),
  },
 {
  path: '/movie/:movieId',
  name: 'MovieDetails',
  component: () => import('@/views/MovieDetailsView.vue'),
  props: route => ({ movieId: Number(route.params.movieId) }),
},
{
  path: '/programa/:programaId',
  name: 'ProgramaDetails',
  component: () => import('../views/ProgramaDetailsView.vue'),
  props: route => ({ programaId: Number(route.params.programaId) }),
},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;