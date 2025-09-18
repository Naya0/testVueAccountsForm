import { createRouter, createWebHistory } from 'vue-router'
import AccountView from '../views/AccountView.vue'

const routes = [
  {
    path: '/',
    name: 'Accounts',
    component: AccountView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
