import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { parseSearch } from '@/utils'

function setToken() {
    const search = parseSearch(location.search)
    if (search.token) {
        store.dispatch('user/setToken', search.token)
    }
}

setToken()

router.beforeEach(async (to, from, next) => {
    // 开始进度条
    NProgress.start()
    next()
})

router.afterEach(() => {
    // 结束进度条
    NProgress.done()
})
