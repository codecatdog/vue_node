import Vue from 'vue'
import App from './app'
import VueResource from 'vue-resource'
import ax from './http/http'

Vue.prototype.$axios = ax
Vue.use(VueResource)
new Vue ({
    el: '#app',
    render: h => h(App)
})