const permission = (el, binding, vnode) => {
  const { value } = binding // value String/Array
  // 插件按钮权限
  const btnRoles = vnode.context.__permission__ || []
  // value instanceof Array
  if (value && value.length > 0) {
    const permissionRoles = value

    const hasPermission = btnRoles.some((role) => {
      if (permissionRoles instanceof Array) {
        return permissionRoles.includes(role.id) && role.power === 1
      } else {
        return role.id === permissionRoles && role.power === 1
      }
    })

    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('need roles! Like v-permission="\'indexPage_edit\'"')
  }
}
export default {
  name: 'plu-permission',
  inserted: permission,
  bind: permission,
  updated: permission
}
