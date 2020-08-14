<template>
    <div class="outerNet">
        <left-menu
            title="外网管理"
            @toggle="toggleUrl"
            :menuRouter="menuRouter"
        ></left-menu>
        <right-sevtion :pageUrl="pageUrl"></right-sevtion>
    </div>
</template>

<script>
import '@/styles/plugin/common.scss'
export default {
    name: "center",
    data() {
        return {
            pageUrl: "outerNet/release/release.vue",
            menuRouter: [
                {
                    indexLink: "outerNet/release/release.vue",
                    title: "消息发布"
                },
                {
                    indexLink: "outerNet/link/link.vue",
                    title: "友情链接"
                },
                {
                    indexLink: "outerNet/guide/guide.vue",
                    title: "服务指南"
                },
                {
                    indexLink: "outerNet/shuffle/shuffle.vue",
                    title: "轮播图"
                },
                {
                    indexLink: "outerNet/copyrightnMaintenance/copyrightnMaintenance.vue",
                    title: "版权维护"
                }
            ]
        };
    },
    methods: {
        toggleUrl(url) {
            this.pageUrl = url
        }
    }
};
</script>

<style lang="scss" scoped>
@import url('//at.alicdn.com/t/font_1963747_r7xohxfjkpi.css');
</style>
