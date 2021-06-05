import { RouteConfig } from 'vue-router'

export default [
    {
        name: 'index',
        path: '',
        component: () => import('@/views/Index.vue')
    }

] as Array<RouteConfig>