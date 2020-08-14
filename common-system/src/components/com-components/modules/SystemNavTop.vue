<template>
    <div class="SystemNavTop">
        <div class="nav-top">
            <div class="nav-logo">
                <img
                    src="@/assets/img/logo2.png"
                    alt=""
                >
            </div>
            <ul class="nav-title">
                <router-link
                    to="/index/homepage"
                    tag="li"
                    class="nav-li"
                ><i class="el-icon-s-home"></i>首页</router-link>
                <router-link
                    to="/system/systemManage"
                    tag="li"
                    class="nav-li"
                ><i class="el-icon-menu"></i>系统管理</router-link>
                <router-link
                    to="/system/baseData"
                    tag="li"
                    class="nav-li"
                ><i class="el-icon-data-analysis"></i>基础数据管理</router-link>
                <router-link
                    to="/system/recruit"
                    tag="li"
                    class="nav-li"
                ><i class="el-icon-coin"></i>招聘管理</router-link>
                <router-link
                    to="/system/workbench"
                    tag="li"
                    class="nav-li"
                ><i class="el-icon-monitor"></i>工作台</router-link>
                <router-link
                    to="/system/outerNet"
                    tag="li"
                    class="nav-li"
                ><i class="el-icon-document-remove"></i>外网管理</router-link>
            </ul>
            <ul class="nav-right">
                <li class="nav-message">
                    <i class="el-icon-bell"></i>
                    <span class="nav-circle Violet"></span>
                </li>
                <li class="nav-message">
                    <i class="el-icon-setting"></i>
                    <span class="nav-circle green"></span>
                </li>
                <li class="nav-message">
                    <img
                        src="@/assets/img/headerImg.png"
                        class="nav-header-img"
                        alt=""
                    >
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
    name: "SystemNavTop",
    data() {
        return {};
    },
    components: {},
    //   created() {
    //   },
    methods: {},
};
</script>
<style lang="stylus" scoped>
.SystemNavTop {
    width: 100%;
    min-width: 1360px;
    height: 60px;
    padding: 0 26px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 1px 0px rgba(186, 183, 190, 0.78);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;

    .nav-top {
        height: 60px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .nav-logo {
        width: 304px;
        height: 50px;
        margin-right: 80px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .nav-title {
        flex: 1;
        overflow: hidden;
        font-size: 16px;
        display: flex;
        margin-right: 10px;
        align-items: center;

        .nav-li {
            float: left;
            line-height: 40px;
            padding: 0 16px;
            color: #45436F;
            cursor: pointer;
            margin: 0 0.01%;

            i {
                margin-right: 8px;
                font-size: 18px;
            }
        }

        .active {
            position: relative;
            font-weight: bold;
            background: rgba(245, 245, 245, 1);
            border-radius: 10px;
            color: #2C39EC;
        }
    }

    .nav-right {
    }

    .nav-message {
        float: left;
        width: 38px;
        height: 38px;
        line-height: 38px;
        color: #1F1E34;
        font-size: 17px;
        background: rgba(243, 245, 247, 1);
        border-radius: 50%;
        position: relative;
        margin-left: 14px;
        text-align: center;

        .nav-circle {
            width: 14px;
            height: 14px;
            display: block;
            border-radius: 50%;
            border: 4px solid rgba(255, 255, 255, 1);
            position: absolute;
            top: 0;
            right: 0;

            &.Violet {
                background: #6B53C5;
            }

            &.green {
                background: #00BC47;
            }
        }
    }
}
</style>
