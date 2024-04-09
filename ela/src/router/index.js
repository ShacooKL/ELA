import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchBookView from '@/views/SearchBookView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/searchBook/:searchContent',
      name: 'searchBook',
      component: SearchBookView,
      props:true
    },
   
  ]
})

export default router
