import AsyncComponenst from './AsyncComponenst/index.vue'
/* 注册全局组件 */
const globalComponents = [
    AsyncComponenst
]

export default {
    install: (Vue) => {
        globalComponents.forEach(component => {
            Vue.component(component.name, component)
        })
    }
}
