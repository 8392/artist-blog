<template>
    <div>
        <base-dialog
            title="账户信息"
            :visible.sync="isShow"
            :append-to-body="true"
            width="900px"
        >
            <div class="addUser lookUser viewPage">
                <el-form label-width="70px">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="用户账号">
                                <el-input
                                    v-model="detailData.account"
                                    placeholder
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="姓名">
                                <el-input
                                    v-model="detailData.name"
                                    placeholder
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="部门">
                                <el-input v-model="detailData.department_name" />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="证件类型">
                                <el-select v-model="detailData.papers_type">
                                    <el-option
                                        v-for="item in PaperTypesLsit"
                                        :key="item.paperId"
                                        :label="item.paperName"
                                        :value="item.paperId"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="证件号码">
                                <el-input
                                    v-model="detailData.papers_number"
                                    placeholder
                                    style="width:100%"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="有效日期">
                                <el-col :span="10">
                                    <el-date-picker
                                        v-model="detailData.start_time"
                                        style="width:100%"
                                        type="date"
                                        placeholder="选择日期"
                                    ></el-date-picker>
                                </el-col>
                                <el-col
                                    class="line"
                                    :span="2"
                                    style="text-align: center;"
                                >-</el-col>
                                <el-col :span="10">
                                    <el-date-picker
                                        v-model="detailData.end_time"
                                        style="width:100%"
                                        type="date"
                                        placeholder="选择日期"
                                    ></el-date-picker>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="状态">
                                <el-select
                                    v-model="detailData.enable"
                                    style="width:100%"
                                >
                                    <el-option
                                        label="启用"
                                        :value="1"
                                    ></el-option>
                                    <el-option
                                        label="禁用"
                                        :value="0"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="默认角色">
                                <div class="showDiv">
                                    校内用户
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="用户组">
                                <div class="showDiv">
                                    <span
                                        v-for="(item,index) in detailData.teams"
                                        :key="index"
                                    >
                                        <span>{{item.team_name}}</span>
                                        <span v-if="index+1 < detailData.teams.length">，</span>
                                    </span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="角色">
                                <div class="showDiv">
                                    <span
                                        v-for="(item,index) in detailData.roles"
                                        :key="index"
                                    >
                                        <span>{{item.role_name}}</span>
                                        <span v-if="index+1 < detailData.roles.length">，</span>
                                    </span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="权限范围">
                                <div class="showDiv">
                                    <span
                                        v-for="(item,index) in detailData.orgs"
                                        :key="index"
                                    >
                                        <span>{{item.org_name}}</span>
                                        <span v-if="index+1 < detailData.orgs.length">，</span>
                                    </span>
                                </div>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="权限">
                                <PowerList
                                    ref="poweRef"
                                    :isView="true"
                                    :id="userId"
                                    pageType="relUser"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="权限列表">
                                <el-collapse
                                    accordion
                                    v-model="activeNames"
                                    @change="handleChange"
                                >
                                    <el-collapse-item
                                        v-for="(item, index) in powerListData"
                                        :key="index"
                                        :title="item.title"
                                        :name="index"
                                    >
                                        <el-table
                                            :data="item.data"
                                            border
                                            stripe
                                        >
                                            <el-table-column
                                                align="center"
                                                prop="privilegeName"
                                                label="权限项"
                                            ></el-table-column>
                                            <el-table-column
                                                align="center"
                                                prop="source"
                                                label="来源"
                                            >
                                                <template>
                                                    {{item.title}}
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </el-collapse-item>
                                </el-collapse>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    size="medium"
                    type="primary"
                    @click="isShow = false"
                >返回</el-button>
            </span>
        </base-dialog>
    </div>
</template>

<script>
import { getUserInfo, getAllUserPrivilege, getPaperTypes } from "@/api/systemManage/userManageInner";

export default {
    props: {
        lookUser: {
            type: Boolean
        },
        accountId: {
            type: [String, Number]
        },
        userId: {
            type: [String, Number]
        }
    },
    model: {
        prop: "lookUser",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    data() {
        return {
            // 查看用户
            activeNames: "",
            isShow: false,
            powerListData: [], //权限列表数据
            PaperTypesLsit: [], //证件类型列表
            detailData: { //详情数据
                roleStr: "",
                userStr: ""
            }
        };
    },
    created() {
        this.isShow = this.lookUser;
        this.getUserInfo();
        this.getAllUserPrivilege();
        this.getPaperTypes();
    },
    methods: {
        async getUserInfo() {
            let res = await getUserInfo({ accountId: this.accountId })
            res.department_name = res.orgs[0].org_name
            this.detailData = res;
            // console.log("详情", res)
        },
        async getAllUserPrivilege() { //所以权限列表
            const res = await getAllUserPrivilege({ userId: this.userId })
            let arr = [];
            for (let key in res) {
                if (key == "rolePrivilege") { //角色授权
                    arr.push({
                        title: "角色授权",
                        data: res['rolePrivilege']
                    })
                } else if (key == "teamPrivilege") {//用户组授权
                    arr.push({
                        title: "用户组授权",
                        data: res['teamPrivilege']
                    })
                } else {//用户授权
                    arr.push({
                        title: "用户授权",
                        data: res['userPrivilege']
                    })
                }
            }
            this.powerListData = arr
        },
        async getPaperTypes() { //获取证件类型
            const res = await getPaperTypes();
            this.PaperTypesLsit = res
        },
        handleChange() { }
    }
};
</script>

<style lang="scss" scoped>
.el-dialog__body {
    max-height: 620px;
    overflow: auto;
}
// /deep/ .el-dialog__body {
//     max-height: 620px;
//     overflow: auto;
// }
</style>