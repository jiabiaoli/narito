import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './styles.scss'
import watcher from './client/watcher'
import notice from './client/notice'

Vue.use(ElementUI)
Vue.prototype.$watcher = watcher
Vue.prototype.$notice = notice

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
