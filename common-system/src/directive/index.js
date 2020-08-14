import PluPermission from './pluginPermission'
import img from './img'

const globalDirective = [PluPermission, img]

const install = function (Vue) {
  globalDirective.forEach(item => {
    Vue.directive(item.name, item)
  })
}

export default {
  install
}
