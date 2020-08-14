<template>
    <div class="right">
        <el-scrollbar class="scrollbarContent">
            <div class="right-content">
                <router-view />
                <async-component :url="pageUrl" />
            </div>
        </el-scrollbar>
    </div>
</template>

<script>
export default {
    name: "content-box",
    props: {
        pageUrl: {
            type: String
        },
        title: {
            type: String
        }
    },
    data() {
        return {
            // title:"系统管理"
        };
    },
    methods: {}
};
</script>

<style scoped lang="scss">
.right {
    position: absolute;
    top: 60px;
    left: 240px;
    right: 0;
    bottom: 0;

    .right-content {
        padding: 38px 100px;
    }
}
</style>
