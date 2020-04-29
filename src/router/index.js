import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/index.vue'
import Singer from '../views/singer/index.vue'
import Album from '../views/album/index.vue'
import Search from '../views/search/index/index.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    }, {
        path: '/singer/:id',
        name: 'singer',
        component: Singer
    }, {
        path: '/album/:id',
        name: 'album',
        component: Album
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
