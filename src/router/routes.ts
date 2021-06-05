import VueRouter, { RouteConfig } from 'vue-router'

export default [
    {
        name: 'index',
        path: '',
        component: () => import('@/views/Index')
    }

] as Array<RouteConfig>