import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './styles.scss'
import watcher from './common/watcher/client'

Vue.use(ElementUI)
Vue.prototype.$watcher = watcher

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
