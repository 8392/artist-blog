<template>
    <div class="systemManage">
        <left-menu
            title="系统管理"
            :menuRouter="menuRouter"
            @toggle="toggleUrl"
            defaultActive="/system/systemManage/userManageInner/userManageInner"
        ></left-menu>
        <right-sevtion :pageUrl="pageUrl"></right-sevtion>
    </div>
</template>

<script>
// import '@/styles/plugin/iconfont/iconfont.css'
import '@/styles/plugin/common.scss'
export default {
    name: "center",
    data() {
        return {
            pageUrl: "systemManage/parameter/parameter.vue",
            menuRouter: [
                {
                    indexLink: "systemManage/parameter/parameter.vue",
                    title: "参数管理"
                },
                {
                    indexLink:
                        "systemManage/userManageInner/index.vue",
                    title: "用户管理"
                },
                {
                    indexLink: "systemManage/role/role.vue",
                    title: "角色管理"
                },
                {
                    indexLink: "systemManage/userGroup/userGroup.vue",
                    title: "用户组管理"
                },
                {
                    indexLink: "systemManage/record/record.vue",
                    title: "操作日志"
                },
                {
                    indexLink: "systemManage/onlineList/onlineList.vue",
                    title: "在线用户清单"
                },
                {
                    indexLink: "systemManage/empower/empower.vue",
                    title: "数据授权"
                }
            ]
        };
    },
    methods: {
        toggleUrl(url) {
            // this.pageUrl = "systemManage/parameter/parameter.vue"
            this.pageUrl = url
        }
    }
};
</script>

<style lang="scss" scoped>
@import url("//at.alicdn.com/t/font_1963747_r7xohxfjkpi.css");
</style>

