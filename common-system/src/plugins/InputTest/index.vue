<template>
    <div :class="[$style.userInput,$style.testColor ] ">
        <h2>userName: {{userName}}</h2>
        <p :class="$style.desc">{{desc}}</p>
        <Test1></Test1>
        <el-button @click="dialogVisible = true">我的子组件</el-button>
        <p>
            图标测试
            <svg-icon icon-class="dashboard"></svg-icon>
        </p>
        <div>
            图片测试：
            <!-- <img src="@/assets/test.jpg" v-img alt />
      <img src="@/assets/logo.png" v-img alt="测试图片" />
      <img src="@/assets/test-img.png" v-img alt="测试图片" /> -->
        </div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <span>这是一段信息</span>
            <async-component :url="subPage"></async-component>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button
                    type="primary"
                    @click="dialogVisible = false"
                >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import '@/icons/require-svg'
// import '@/style/commom.less'
// import img from '@/assets/logo.png'
import Test1 from './components/Test1.vue'
export default {
    components: { Test1 },
    props: {
        subPage: {
            // 子组件
            type: String,
            default: ''
        },
        userName: {
            type: String,
            required: true,
            validator(value) {
                // if (!value) {
                //   console.log('这个参数不能为空')
                // }
                return true
            }
        },
        desc: {
            type: String,
            required: true,
            validator(value) {
                // if (!value) {
                //   console.log('这个参数不能为空')
                // }
                return true
            }
        }
    },
    data() {
        return {
            // img,
            dialogVisible: false
        }
    }
}
</script>

<style lang="scss" module>
.testColor {
    font-size: 40px;
    color: blue;
}
.userInput {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    .desc {
        color: red;
        padding: 20px;
    }
}
</style>
