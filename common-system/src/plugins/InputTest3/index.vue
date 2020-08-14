<template>
    <div>
        <el-button @click="testMessage">测试element message</el-button>
        <el-button @click="testRouter">测试 router</el-button>
        <el-button @click="testStore">测试 store</el-button>
        <Demo></Demo>
    </div>
</template>

<script>
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import * as utils from '@/utils'
import * as config from '@/config/static'

const Demo = () => import('./compnents/CaiBoTest1')

console.log('utils:', utils)

console.log('in Axios:', axios)

console.log('static:', config)

export default {
    components: { Demo },
    methods: {
        testStore() {
            console.log('store', store)
            console.log(store.state)
        },
        testRouter() {
            console.log('router', router)
        },
        testMessage() {
            Message({
                type: 'warning',
                message: '测试文字'
            })
        }
    },
    mounted() {
        console.log('axios:', axios)
        axios.get('/test.json').then(res => {
            console.log(res)
        })
    }
}
</script>
