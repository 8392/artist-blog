import { isDev } from 'config'
import Home from '@/views/home/index.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    // redirect: '/demo'
    component: Home
  },
  {
    path: '/demo',
    name: 'Demo',
    component: () => import(/* webpackChunkName: "Demo" */ '@/views/demo/index')
  }
]
if (isDev) {
  const devRoutes = [
    {
      path: '/test',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Test" */ '@/views/test/index'),
      hidden: true
    }

  ]
  routes.unshift(...devRoutes)
}
export default routes
