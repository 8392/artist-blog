import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/styles/element-variables.scss'
import vuePrototype from '@/utils/vue-prototype'
import Component from '@/components/index'
import echarts from 'echarts'
import '@/icons' // icon
import '@/styles/index.scss' // global css
import Directive from '@/directive/index'
import '@/filters' // global filters

Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.use(vuePrototype)
Vue.use(Component)
Vue.use(Directive)
