import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_PATH,
  routes
})

export default router
