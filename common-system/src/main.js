import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission'
import components from '@/components'
import '@/utils/core-plugin'

Vue.config.productionTip = false
Vue.use(components)

import inject from "./utils/inject"; //注入全局Vue插件，（组件，方法，过滤器）
Vue.use(inject);

let app = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

export default app