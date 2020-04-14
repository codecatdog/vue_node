import Vue from 'vue'
import Router from 'vue-router'

// const Home = r => require.ensure([], () => r(require('@/views/Home.vue')))
// const About = r => require.ensure([], () => r(require('@/views/About.vue')))

const Home = () => import( '@/views/Home.vue')
const About = () => import( '@/views/About.vue')

Vue.use(Router)

let routes = [{
    path: '/',
    name: 'home',
    redirect: '/home'
},{
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
        path: '/',
        name: 'about',
        component: About
    }]
}]

const router = new Router({
    routes,
    mode: 'history'
})

export default router