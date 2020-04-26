import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import Singer from '../views/singer/index.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/singer/:id',
        name: 'singer',
        component: Singer
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
