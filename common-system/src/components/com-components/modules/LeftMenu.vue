<template>
    <div class="left-menu">
        <div class="title">{{title}}</div>
        <!-- <slot></slot> -->
        <el-menu
            :default-active="currRoute"
            class="el-menu-vertical-demo"
            background-color="#1F1E34"
            text-color="#FFFFFF"
        >
            <el-menu-item
                :index="item.indexLink"
                v-for="(item,index) in menuRouter"
                :key="index"
                @click="goRoute(item.indexLink)"
            >
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "content-box",
    props: {
        title: {
            type: String
        },
        menuRouter: {
            type: Array,
            default: []
        },
        defaultActive: {
            type: String
        }
    },
    data() {
        return {
            currRoute: "/system/systemManage/userManageInner/userManageInner"
        };
    },
    watch: {
        menuRouter: {
            handler(val) {
                // console.log("menuRouter", val)
                this.currRoute = val[0].indexLink;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        goRoute(link) {
            this.$emit("toggle", link)
            // if (this.$route.fullPath !== link) {
            //     this.$router.push(link);
            // }
        }
    }
};
</script>

<style scoped lang="scss">
.left-menu {
    width: 240px;
    float: left;
    position: relative;
    z-index: 0;
    padding-top: 20px;

    &:before {
        content: "";
        width: 240px;
        height: 100%;
        display: block;
        background: #1f1e34;
        position: fixed;
        top: 0;
        z-index: 0;
    }

    .title {
        font-size: 16px;
        color: rgba(102, 101, 130, 1);
        line-height: 40px;
        position: relative;
        z-index: 1;
        padding-left: 26px;
        text-align: left;
    }

    .el-menu {
        border-right: solid 1px #1f1e34;
    }

    .el-menu-item:focus,
    .el-menu-item:hover {
        outline: 0;
        background-color: red;
    }

    .el-menu-item {
        height: 40px;
        line-height: 40px;
        // text-align: center;
        padding-left: 80px !important;
    }

    .el-menu-item.is-active {
        position: relative;

        &:before {
            content: "";
            width: 3px;
            height: 20px;
            background: #707aff;
            position: absolute;
            left: 0;
            top: 10px;
        }
    }
}
</style>
