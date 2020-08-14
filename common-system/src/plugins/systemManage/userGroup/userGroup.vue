<template>

    <div class="userGroup common-pagination1">
        <common-title
            titleBig="系统管理"
            titleSmall="用户组管理"
        ></common-title>
        <div class="common-type">
            <div class="userGroup-title">
                <i class="iconfont iconlingxing"></i>
                自定义组管理
            </div>
        </div>
        <section class="realNameBox userGroup-custom ">
            <div class="realNameBox-left userGroup-custom-left adduser">
                <el-input
                    placeholder="输入关键字进行过滤"
                    style="border:none;"
                    v-model="filterText"
                    suffix-icon="el-icon-search"
                ></el-input>
                <div class="userGroup-userGroup-tree-box">
                    <el-scrollbar class="scrollbarContent">
                        <el-tree
                            :data="userGroupData.tree"
                            :props="userGroupData.defaultProps"
                            node-key="team_id"
                            :expand-on-click-node="false"
                            default-expand-all
                            highlight-current
                            :filter-node-method="filterNode"
                            ref="treeRef"
                            @node-click="UGChangeTree"
                        >
                        </el-tree>
                    </el-scrollbar>
                </div>
                <ul class="userGroup-custom-tree-opt">
                    <li @click="adduserDialog=true"><i class="iconfont icon-xinjianwenjianjia"></i>新建用户组</li>
                    <li @click="powerDialog=true"><i class="iconfont icon-duihao"></i>授权</li>
                    <li @click="deleteGroup"><i class="el-icon-delete"></i>删除</li>
                </ul>
            </div>
            <div class="realNameBox-right">
                <el-scrollbar class="scrollbarContent">
                    <div class="userGroup-custom-rightContent viewPage">
                        <el-form
                            :model="groupFrom"
                            ref="groupFrom"
                            label-width="110px"
                            class="demo-ruleForm"
                        >
                            <el-form-item
                                label="组名称:"
                                prop="name"
                            >
                                <el-input
                                    type="text"
                                    v-model="groupDetail.team_name"
                                ></el-input>
                            </el-form-item>
                            <el-form-item
                                label="描述:"
                                prop="describe"
                            >
                                <el-input
                                    type="textarea"
                                    v-model="groupDetail.team_describe_info"
                                ></el-input>
                            </el-form-item>
                            <el-form-item label="业务范围:">
                                <el-radio-group v-model="groupFrom.resource">
                                    <el-radio label="本部门"></el-radio>
                                    <el-radio label="自定义"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="权限">
                                <!-- 权限组件 -->
                                <PowerList
                                    :isView="true"
                                    ref="powerRightRef"
                                    :id="UGdata.team_id"
                                    pageType="user"
                                    v-if="showPoweRight"
                                />
                            </el-form-item>
                        </el-form>
                    </div>
                </el-scrollbar>

            </div>
        </section>
        <div class="common-type">
            <div class="userGroup-title">
                <i class="iconfont iconlingxing"></i>
                成员列表
            </div>
            <ul class="type-tool">
                <li @click="addMemberDialog = true"><i class="el-icon-circle-plus"></i>新增成员</li>
                <li
                    @click="deleteMeth"
                    class="hover-red"
                ><i class="el-icon-delete"></i>删除</li>
                <li class="type-search">
                    <el-input
                        v-model="queryData.condition"
                        size="medium"
                        placeholder="工号、姓名、账号"
                    >
                        <el-button
                            @click="updateList"
                            slot="append"
                            icon="el-icon-search"
                        ></el-button>
                    </el-input>
                </li>
            </ul>
        </div>
        <TableList
            ref="tableRef"
            :columns="columns"
            :params="queryData"
            :api="getTeamMember"
            :isRequest="false"
            @selection-change="selectionChange"
        >
            <template #enable="scope">
                {{scope.row.enable | getState}}
            </template>
            <template #cz="scope">
                <el-button
                    @click="See(scope.row)"
                    type="text"
                    size="medium"
                >查看</el-button>
            </template>
        </TableList>
        <!-- 新增用户组 -->
        <addUserGroup
            @updateList="changeTreeApi"
            v-model="adduserDialog"
            v-if="adduserDialog"
            :team_parent_id="UGdata.team_id"
        />
        <!-- 授权 -->
        <el-dialog
            title="授权"
            :visible.sync="powerDialog"
            width="750px"
        >
            <div class="addUser">
                <el-form
                    label-width="40px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="权限">
                        <PowerList
                            ref="poweRef"
                            :id="UGdata.team_id"
                            pageType="user"
                            v-if="powerDialog"
                        />
                    </el-form-item>
                </el-form>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    size="medium"
                    type="warning"
                    @click="powerDialog=false"
                >取消</el-button>
                <el-button
                    size="medium"
                    type="primary"
                    @click="powerMeth"
                >确认</el-button>
            </span>
        </el-dialog>
        <!-- 查看账户信息-->
        <!-- 查看 -->
        <ViewUser
            v-if="lookUser"
            v-model="lookUser"
            :accountId="accountId"
            :userId="userId"
        />
        <!-- 添加成员 -->
        <addMember
            @updateList="updateList"
            v-model="addMemberDialog"
            v-if="addMemberDialog"
            :teamId="UGdata.team_id"
        />
    </div>
</template>

<script>
const ViewUser = () => import("@/components/systemManage/userManageInner/ViewUser.vue");
const addUserGroup = () => import("@/components/systemManage/userGroup/add.vue");
const addMember = () => import("@/components/systemManage/userGroup/addMember.vue");

import { getTeamList, teamDetails, getTeamMember, deleteMember, deleteTeam } from "@/api/systemManage/userGroup";
import { powerTeam } from "@/api/common";

export default {
    name: "userGroup",
    components: {
        ViewUser,
        addUserGroup,
        addMember
    },
    data() {
        return {
            filterText: '',
            userGroupData: {
                tree: [],
                defaultProps: {
                    children: 'children',
                    label: 'team_name'
                },
            },
            getTeamMember: getTeamMember,
            queryData: {
                condition: "", //搜索条件
                teamId: ""
            },
            accountId: "",
            userId: "",
            columns: [
                //列表数据
                {
                    type: "selection"
                },
                {
                    label: "账号",
                    prop: "account"
                },
                {
                    label: "工号",
                    prop: "loginId"
                },
                {
                    label: "姓名",
                    prop: "realName"
                },
                {
                    label: "部门",
                    prop: "orgName"
                },
                {
                    label: "职务",
                    prop: "end_time"
                },
                {
                    label: "职级",
                    prop: "initpwd"
                },
                {
                    label: "账号状态",
                    slotName: "enable"
                },
                {
                    label: "操作",
                    slotName: "cz",
                    width: "300px"
                }
            ], //列表数据
            groupFrom: {
                name: '',
                describe: '',
                resource: '',
                activeName: '',
                // 招聘管理
            },
            // 新增用户组弹框
            adduserDialog: false,
            // 权限详情
            powerDialog: false,
            // 删除用户组
            deleteDialog: false,
            // 添加成员
            addMemberDialog: false,
            // 删除成员
            deleteDialog2: false,

            // 查看用户
            lookUser: false,
            Register: {
                phone: '',
                sendcode: '',
            },
            disabled: false,
            time: 0,
            btntxt: "重新发送",
            UGdata: {  //选择的用户组树
                team_id: '',//当前ID
                team_parent_id: '',//父级ID
            },
            groupDetail: {}, //用户组详情
            selectData: [], //选择的数据
            userIdStr: [],
            showPoweRight: false,//默认显示右边权限
        }
    },
    filters: {
        getState(val) {
            if (val == 1)
                return '启用'
            else
                return '禁用'
        }
    },
    created() {
        this.getTeamListTree();
    },
    mounted() {
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        async getTeamListTree() { //获取用户组树
            const res = await getTeamList();
            this.userGroupData.tree = res.tables;
            if (this.userGroupData.tree.length > 0) {
                this.UGdata.team_id = res.tables[0].team_id;
                this.showPoweRight = true;
                this.queryData.teamId = res.tables[0].team_id; //列表请求数据
                this.$nextTick(() => {
                    this.$refs.treeRef.setCurrentKey(res.tables[0].team_id)
                })
                this.getTeamDetails();//默认展示第一条
                this.updateList();
            }
        },
        async changeTreeApi() { //更新树
            const res = await getTeamList();
            this.userGroupData.tree = res.tables;
        },
        updateList() { //更新列表信息
            this.$refs.tableRef.refresh();
        },
        async powerMeth() {
            const privilegeIdArray = this.$refs.poweRef.getShowPower()
            const res = await powerTeam({
                operatorId: 1,
                teamId: this.UGdata.team_id,
                privilegeIdArray
            })
            this.$refs.powerRightRef.getPowerTree(); //更新权限接口
            this.powerDialog = false;
            this.$message.success("授权成功！")
        },
        async getTeamDetails() {  //获取用户组详情
            const res = await teamDetails({ teamId: this.UGdata.team_id });
            this.groupDetail = res;
        },
        async UGChangeTree(data) {//点击用户组
            this.UGdata.team_id = data.team_id;
            this.UGdata.team_parent_id = data.team_parent_id;
            this.queryData.teamId = data.team_id; //列表请求数据
            this.$refs.powerRightRef.getPowerTree(); //更新权限接口
            this.getTeamDetails();//获取用户组详情
            this.updateList();
        },
        async deleteGroup() { //删除组
            this.$delConfirm({
                type: "delMes",
                msg: "确认删除用户组？",
                beforeClose: async done => {
                    const res = await deleteTeam({
                        teamId: this.UGdata.team_id
                    });
                    done();
                    this.$message.success("删除成功！")
                    this.getTeamListTree(); //更新树
                    this.$refs.powerRightRef.getPowerTree(); //更新权限接口
                }
            }).catch(() => { });
        },
        async deleteMeth() { //删除成员
            if (this.selectData.length === 0) {
                this.$message.warning("请选择成员！")
                return;
            }
            this.$delConfirm({
                type: "delMes",
                beforeClose: async done => {
                    const res = await deleteMember({
                        teamId: this.UGdata.team_id,
                        userIdStr: this.userIdStr
                    });
                    done();
                    this.$message.success("删除成功！")
                    this.updateList(); //更新列表
                }
            }).catch(() => { });

        },
        selectionChange(data) {
            this.selectData = data;
            let currData = []
            data.forEach((curr) => {
                currData.push(curr.id);
            })
            this.userIdStr = currData.join(",");
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.team_name.indexOf(value) !== -1;
        },
        // 查看
        See(row) {
            this.userId = row.id;
            this.accountId = row.accountId;
            this.lookUser = true;
        },
    },
};
</script>
<style lang="scss" scoped>
.userGroup {
    .userGroup-title {
        font-size: 14px;
        font-weight: bold;
        color: rgba(69, 67, 111, 1);
        .iconlingxing {
            font-size: 6px;
            margin-right: 5px;
        }
    }
    .userGroup-custom-left.realNameBox-left {
        width: 300px;
        height: 450px;
    }
    .userGroup-userGroup-tree-box {
        height: 357px;
    }
    .userGroup-custom-tree-opt {
        height: 50px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-top: 1px solid rgba(229, 229, 229, 1);
        li {
            font-size: 14px;
            font-weight: bold;
            color: #1f1e34;
            cursor: pointer;
            i {
                margin-right: 4px;
                color: #989898;
            }
            &:hover {
                color: rgba(31, 157, 43, 1);
                i {
                    color: rgba(31, 157, 43, 1);
                }
            }
        }
    }
    .realNameBox-right {
        height: 450px;
        padding-top: 50px;
        border-top: 1px solid rgba(229, 229, 229, 1);
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        border-right: 1px solid rgba(229, 229, 229, 1);
        .userGroup-custom-rightContent {
            width: 670px;
        }
    }
    .tableBox {
        margin-bottom: 30px;
    }
}
</style>
