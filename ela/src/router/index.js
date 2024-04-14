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
import BookView from '@/views/BookView.vue'
import ReadingExperience from '@/components/ReadingExperience.vue'
import ReadingExpList from '@/components/ReadingExpList.vue'
import ReadingExpItem from '@/components/ReadingExpItem.vue'
import  {useBookStore}  from '@/stores/book'
import { useUserStore } from '@/stores/user'
import { useReadingStore } from '@/stores/reading'

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
      bookStore.getBooks(to.params.searchContent)
    },
  },
  {
    path: '/reading/:id',
    name: 'reading',
    component: ReadingView,
    beforeEnter: (to, from) => {
      const readingStore = useReadingStore()
      if(readingStore.book ==null)
        return {name:'home'}
      readingStore.getChapter(to.params.id)
    },
  },
  {
    path:'/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path:'/book/:id',
    name:'book',
    component:BookView,
    beforeEnter: (to, from) => {
      const bookStore = useBookStore()
      bookStore.getBook(to.params.id)
    },
  },
  {
    path:'/user/:id',
    name: 'user',
    redirect: to => {
      return `/user/${to.params.id}/home`; // 使用动态参数构建重定向路径
    },
    component: UserView,
    beforeEnter: (to, from) => {
      const userStore = useUserStore()
     
      if(!userStore.isLogin){
        userStore.loginWidowShow = true
        return {name:'home'}
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
      {
        path:'readingExp',
        name:'readingExp',
        // redirect:'readingExp/readingExpItem',
        component:ReadingExperience,
        children:[
          {
            path:'readingExpList',
            name:'readingExpList',
            component:ReadingExpList,
            beforeEnter: (to, from) => {
              const userStore = useUserStore()
              if(!userStore.isLogin){
                userStore.loginWidowShow = true
                return false
              }
              const readingStore = useReadingStore()
              readingStore.getExpList()
            }
          },
          {
            path:'readingExpItem/:expId',
            name:'readingExpItem',
            component:ReadingExpItem,
            beforeEnter: (to, from) => {
              const userStore = useUserStore()
              if(!userStore.isLogin){
                userStore.loginWidowShow = true
                return false
              }
              const readingStore = useReadingStore()
              readingStore.getExp(to.params.expId)
            }
          },
        ]
      },
   
   
    ]
  }
 
]
export default routes
