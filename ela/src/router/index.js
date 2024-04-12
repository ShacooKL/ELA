import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchBookView from '@/views/SearchBookView.vue'
import ReadingView from '@/views/ReadingView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UserView from '@/views/UserView.vue'
import UserHome from '@/components/UserHome.vue'
import UserCollection from '@/components/UserCollection.vue'
import Friends from '@/components/Friends.vue'
import Setting from '@/components/Setting.vue'
import  {useBookStore}  from '@/stores/book'
import { useUserStore } from '@/stores/user'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: (to, from) => {
      const bookStore = useBookStore()
      bookStore.initBooks()
    },
  },
  {
    path: '/searchBook/:searchContent',
    name: 'searchBook',
    component: SearchBookView,
    props:true,
    beforeEnter: (to, from) => {
      const bookStore = useBookStore()
      bookStore.bookList=[]
      bookStore.queryBooks(to.params.searchContent)
    },
  },
  {
    path: '/reading/:id',
    name: 'reading',
    component: ReadingView,
  },
  {
    path:'/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path:'/user/:id',
    name: 'user',
    component: UserView,
    beforeEnter: (to, from) => {
      const userStore = useUserStore()
      if(!userStore.isLogin){
        userStore.loginWidowShow = true
        return false
    }
    },
    children:[
      {
        path:'home',
        name:'userHome',
        component:UserHome,
        beforeEnter: (to, from) => {
          const bookStore = useBookStore()
          const userStore = useUserStore()
          if(!userStore.isLogin){
            userStore.loginWidowShow = true
            return false
          }
          bookStore.getCurrReading()
        }
      },
      {
        path:'collection',
        name:'userCollection',
        component:UserCollection,
        beforeEnter: (to, from) => {
          const bookStore = useBookStore()
          const userStore = useUserStore()
          if(!userStore.isLogin){
            userStore.loginWidowShow = true
            return false
          }
          bookStore.getCollection()
        }
      },
      {
        path:'friends',
        name:'friends',
        component:Friends,
        beforeEnter: (to, from) => {
          const userStore = useUserStore()
          if(!userStore.isLogin){
            userStore.loginWidowShow = true
            return false
          }
          userStore.getFriends()
        }
      },
      {
        path:'setting',
        name:'setting',
        component:Setting
      },
   
   
    ]
  }
 
]
export default routes
