// import request from '@/api/oneApi/post'
import request from '@/utils/request'
export default {
    created() {
        const methods1 = ['get', 'delete', 'head', 'options']
        const methods2 = ['post', 'put', 'patch']
        this.$axios = (config) => {
            return request({
                ...config,
                headers: {
                    ...config.headers,
                    ...this.__headers__
                }
            })
        }
        methods1.forEach(mItem => {
            this.$axios[mItem] = (url, config = {}) => {
                return request({
                    method: mItem,
                    url,
                    ...config,
                    headers: {
                        ...config.headers,
                        ...this.__headers__
                    }
                })
            }
        })
        methods2.forEach(mItem => {
            this.$axios[mItem] = (url, data, config = {}) => {
                return request({
                    method: mItem,
                    url,
                    data,
                    ...config,
                    headers: {
                        ...config.headers,
                        ...this.__headers__
                    }
                })
            }
        })
    },
    data() {
        return {
            $axios: {}
        }
    }
}
