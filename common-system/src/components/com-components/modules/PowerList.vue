<template>
    <!-- 权限列表组件 -->
    <div
        :class="isView ? 'isView' : ''"
        v-loading="loading"
    >
        <el-collapse
            accordion
            v-model="activeName"
            class="empower-right"
        >
            <el-collapse-item
                v-for="first in treeData"
                :key="first.id"
                :name="first.id"
            >
                <template slot="title">
                    <div class="btn-left">
                        <!-- @click="hanleEvent('first', first)" -->

                        <!-- <el-checkbox
                            @change="hanleEvent('first', first, $event)"
                            v-model="first.isShow"
                        >{{first.father.privilegeName}}</el-checkbox> -->
                        {{first.father.privilegeName}}
                    </div>
                </template>
                <div
                    v-for="second in first.childs"
                    :key="second.id"
                >
                    <h4
                        class="empower-title"
                        @click="hanleEvent('second', second)"
                    >
                        <el-checkbox
                            @change="hanleEvent('second', second, $event)"
                            v-model="second.isShow"
                        ><i class="iconfont iconlingxing"></i>{{second.father.privilegeName}}</el-checkbox>
                    </h4>
                    <ul class="checkbox-ul">
                        <li
                            v-for="third in second.childs"
                            :key="third.id"
                            class="checkbox-li"
                        >
                            <span
                                @click="hanleEvent('third', third)"
                                class="checkbox-type"
                                :class="[third.isShow ? 'active':'']"
                            >{{third.father.privilegeName}}</span>
                            <span @click="hanleEvent('third', third)">
                                <el-checkbox
                                    @change="hanleEvent('third', third, $event)"
                                    v-model="third.isShow"
                                    label="授权"
                                ></el-checkbox>
                            </span>
                        </li>
                    </ul>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import { allPrivilegeData, rolePrivilegeList, getTeamPrivilegeList, getUserPrivilegeList } from "@/api/common";
const config = {
    role: {//角色
        id: 1,//传过来的ID
        showApi: rolePrivilegeList,
        query: {
            roleId: '',
        }
    },
    user: {//用户组
        id: 2,//传过来的ID
        showApi: getTeamPrivilegeList,
        query: {
            teamId: '',
        }
    },
    relUser: { //用户授权
        id: 3,//传过来的ID
        showApi: getUserPrivilegeList,
        query: {
            userId: '',
        }
    }
}

export default {
    props: {
        id: {
            type: [String, Number]
        },
        pageType: {
            type: String
        },
        isView: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            treeData: [],
            showList: [],
            activeName: 1,
            roleId: 22,
            config: {},//匹配的类型
            showData: [],
            loading: true,
        }
    },
    created() {
        this.getPowerTree()
    },
    methods: {
        stopMeth() { },
        async getPowerTree() { //获取权限树
            this.loading = true;
            if (this.pageType == 'role') {
                config.role.query.roleId = this.id;
            } else if (this.pageType == 'user') {
                config.user.query.teamId = this.id;
            } else {//用户
                config.relUser.query.userId = this.id;
            }
            this.config = config[this.pageType];
            let showList = await this.config.showApi(this.config.query); //请求显示的接口
            this.showList = showList.map((curr) => {
                return Number(curr)
            })
            const treeData = await allPrivilegeData();
            this.loading = false;
            this.treeData = treeData;
            this.changeTree(treeData);
            // console.log("权限tree", showList, treeData)
        },
        changeTree(treeData) { //解析树结构
            treeData.forEach((curr) => {
                if (this.showList.includes(Number(curr.id))) {  //选中当前有权限的样式
                    curr.isShow = true;
                } else {
                    curr.isShow = false;
                }
                if (curr.childs && curr.childs.length > 0) {
                    this.changeTree(curr.childs)
                }
            })
        },
        hanleEvent(type, data) {
            this.clcikThird(this.treeData, data.id);
        },
        clcikThird(treeData, currId) {
            for (let curr of treeData) {
                if (curr.id == currId) {
                    curr.isShow = !curr.isShow
                    if (curr.childs && curr.childs.length > 0) {
                        curr.childs.forEach((item1) => {
                            if (curr.isShow) {
                                item1.isShow = true
                            } else {
                                item1.isShow = false
                            }
                            if (item1.childs && item1.childs.length > 0) {
                                item1.childs.forEach((item2) => {
                                    if (item1.isShow) {
                                        item2.isShow = true
                                    } else {
                                        item2.isShow = false
                                    }
                                })
                            }
                        })
                    }
                    break; //终止本次循环
                }
                if (curr.childs && curr.childs.length > 0) {
                    this.clcikThird(curr.childs, currId)
                    let isAllShow = curr.childs.every(chl => chl.isShow);
                    if (isAllShow) {
                        curr.isShow = true;
                    } else {
                        curr.isShow = false;
                    }
                }
            }
            this.treeData = treeData;
        },
        getShowPower() { //获取选中的权限
            this.showData = [];
            this.getShowTree(this.treeData)
            this.showData = this.showData.join(",")
            return this.showData;
        },
        getShowTree(treeData) { //解析选中的权限树
            treeData.forEach((curr) => {
                if (curr.isShow) {
                    this.showData.push(curr.id)
                }
                if (curr.childs && curr.childs.length > 0) {
                    this.getShowTree(curr.childs)
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.isView {
    .btn-left {
        pointer-events: none;
    }
    .empower-title,
    .checkbox-li {
        pointer-events: none;
    }
}
.btn-left {
    width: 100px;
}
.iconlingxing {
    font-size: 14px;
    margin-right: 5px;
}
</style>