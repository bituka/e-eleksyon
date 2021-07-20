import { createRouter, createWebHashHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Dashboard from '../views/Dashboard.vue'
import Lin from "../views/LoginUI.vue";
import Ballot from "../views/BallotUI.vue";


const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/confirm',
    name: 'Confirm',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "confirm" */ '../views/Confirm.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: Lin
  },
  {
    path: '/ballot',
    name: 'Login',
    component: Ballot
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
