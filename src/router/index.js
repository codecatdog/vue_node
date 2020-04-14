import Router from 'vue-router'
import Vue from 'vue'

const Home = r => require.ensure([], () => r(require('@/views/Home.vue')))
const About = r => require.ensure([], () => r(require('@/views/About.vue')))

Vue.use(Router)

const routes = [{
    path: '/',
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
    routes, mode: 'history'
})

export default router