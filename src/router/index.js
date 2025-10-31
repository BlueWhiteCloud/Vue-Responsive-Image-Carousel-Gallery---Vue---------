import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/catalogue1',
    name: 'catalogue1',
    component: () => import('../views/catalogue1.vue')
  },
  {
    path:'/catalogue2',
    name:'catalogue2',
    component: () => import('../views/catalogue2.vue')
  },
  {
    path:'/catalogue3',
    name:'catalogue3',
    component: () => import('../views/catalogue3.vue')
  },
  {
    path:'/about',
    name:'about',
    component: () => import('../views/About.vue'),
    meta: {
      skipLoading: true
    }
  },
  {
    path:'/contact',
    name:'contact',
    component: () => import('../views/Contact.vue')
  },
  {
    path:'/produce',
    name:'produce',
    component: () => import('../views/Produce.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
