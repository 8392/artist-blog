import { pathParse } from '@/utils'
export default {
  name: 'img',
  inserted (el, bingding, vnode) {
    // 插件按钮权限
    const url = vnode.context.__url__ || ''
    const imgSrc = el.src
    if (imgSrc.includes('data:image') || imgSrc.includes('base64')) {
      return false
    }
    if (url && imgSrc) {
      const { base: imgName } = pathParse(imgSrc)
      el.src = `${url}/img/${imgName}`
    }
  }
}
