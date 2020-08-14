import globalComponent from "@/components/com-components/index.js"; //引入全局公用组件
import delConfirm from "@/components/extend/delExtend/index.js"

export default {
    install: (Vue) => {
        Object.keys(globalComponent).forEach((key) => {
            Vue.component(key, globalComponent[key]);
        });
        Vue.prototype.$delConfirm = delConfirm //全局删除提示
    },
};