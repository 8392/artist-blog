<template>
    <div class="userManage common-pagination1">
        <common-title
            titleBig="系统管理"
            titleSmall="用户管理"
        ></common-title>
        <div class="common-type">
            <div class="type-option">
                <el-button
                    @click="handelPage(1)"
                    :type="pageType == 1 ? 'primary' : ''"
                >
                    <i class="iconfont iconxiaoneishehuizhiwu"></i>校内用户
                </el-button>
                <el-button
                    @click="handelPage(2)"
                    :type="pageType == 2 ? 'primary' : ''"
                >
                    <i class="iconfont iconyuanxing"></i>校外用户
                </el-button>
            </div>
            <InnerSearch v-if="pageType == 1" />
            <OutsideSearch v-if="pageType == 2" />
        </div>
        <Search v-if="pageType == 2" />
        <InnerList v-if="pageType == 1" />
        <OutsideList v-if="pageType == 2" />
    </div>
</template>

<script>
const InnerList = () => import("./InnerList.vue");
const InnerSearch = () => import("./InnerSearch.vue");
const Search = () => import("./Search.vue");
const OutsideList = () => import("./OutsideList.vue");
const OutsideSearch = () => import("./OutsideSearch.vue");
import { createRequest } from '@/utils/request2'
// import createApi, { download } from "@/api/systemManage/userManageInner";
import { getUserListByPage, enable, disable, deleteSchoolUser, download, importSchoolUser } from "@/api/systemManage/userManageInner";
// getUserListByPage, enable, disable, deleteSchoolUser, download, importSchoolUser
// let api = {}
export default {
    name: "userManage",
    components: { InnerList, InnerSearch, Search, OutsideList, OutsideSearch },
    created() {
        console.log("我是测试HEADER..this.__headers__", this.__headers__)
        // api = {}
        // let headers = {
        //     ...this.__headers__
        // }
        // let serve = createRequest(this.$_axios, this.$message, headers)
        // api = createApi(serve)
        // this.getUserListByPage = api.getUserListByPage
        // this.enableApi = api.enable;
    },
    data() {
        return {
            pageType: 1, //1：校内，2：校外
        };
    },
    methods: {
        handelPage(type) {
            this.pageType = type;
        }
    }
};
</script>
<style lang="scss" scoped>
.type-option {
    display: flex;
}
</style>
