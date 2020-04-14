import Vue from 'vue'
import App from './app'
import VueResource from 'vue-resource'
import ax from './http/http'
import router from './router'

Vue.prototype.$axios = ax
Vue.use(VueResource)
new Vue ({
    el: '#app',
    router,
    render: h => h(App)
})