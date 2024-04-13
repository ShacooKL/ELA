import './assets/ela.css';
import { createApp} from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import routes from './router'
const app = createApp(App)
const pinia = createPinia()
pinia.use(
  createPersistedState({
    storage: sessionStorage,
  })
)
app.use(pinia)
const router = createRouter({
  history:createWebHistory(import.meta.BASE_URL),
  routes:routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { top: 0 }
  }
})
app.use(router)
app.use(ElementPlus,{size:'small',zIndex:3000})
app.mount('#app')
