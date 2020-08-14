<template>
    <base-dialog
        title="添加成员"
        :visible.sync="isShow"
        width="1200px"
        append-to-body
    >
        <ul class="realNameBox">
            <li class="realNameBox-left adduser">
                <el-input
                    placeholder="输入关键字进行过滤"
                    style="border: none; "
                    v-model="filterText"
                    suffix-icon="el-icon-search"
                ></el-input>
                <el-tree
                    ref="scBustree"
                    class="filter-tree"
                    :data="accountName.treeData"
                    node-key="orgCode"
                    :props="accountName.defaultProps"
                    :expand-on-click-node="false"
                    default-expand-all
                    highlight-current
                    :filter-node-method="filterNode"
                    @node-click="ANChangeTree"
                >
                </el-tree>
            </li>
            <li class="realNameBox-right">
                <div class="right-top">
                    <el-form
                        :inline="true"
                        class="demo-form-inline"
                    >
                        <el-form-item label="姓名">
                            <el-input
                                v-model="accountName.queryData.realName"
                                placeholder="姓名"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="工号">
                            <el-input
                                v-model="accountName.queryData.loginId"
                                placeholder="工号"
                            ></el-input>
                        </el-form-item>
                        <el-form-item label="账号">
                            <el-input
                                v-model="accountName.queryData.account"
                                placeholder="账号"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                size="medium"
                                type="primary"
                                @click="changeList"
                            >搜索</el-button>
                        </el-form-item>
                    </el-form>
                    <TableList
                        ref="ANtableRef"
                        :isRequest="false"
                        :columns="accountName.columns"
                        :params="accountName.queryData"
                        :api="accountName.getUserByOrgId"
                        @selection-change="selectionChange"
                    >
                        <template #cz="scope">
                            <el-button
                                @click="See(scope.$index, scope.row)"
                                type="text"
                                size="medium"
                            >查看</el-button>
                        </template>
                    </TableList>
                </div>
            </li>
        </ul>
        <span
            slot="footer"
            class="dialog-footer"
        >
            <el-button
                size="medium"
                type="primary"
                @click="sureAdd"
            >完成</el-button>
        </span>
    </base-dialog>
</template>

<script>
import { getOrg, getUserByOrgId } from "@/api/systemManage/userManageInner";
import { addRoleMember } from "@/api/systemManage/role"; //添加角色成员
import { addUserMember } from "@/api/systemManage/userGroup"; //添加用户组成员


export default {
    props: {
        addMemberDialog: {
            type: Boolean
        },
        roleId: { //角色ID
            type: [String, Number]
        },
        teamId: { //用户组管理新增传的
            type: [String, Number]
        }
    },
    model: {
        prop: "addMemberDialog",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        },
        filterText(val) {
            this.$refs.scBustree.filter(val);
        }
    },
    created() {
        this.getOrgApi();
        this.isShow = this.addMemberDialog;
    },
    data() {
        return {
            isShow: false,
            filterText: "",
            newMemberFrom: {
                name: ""
            },
            accountName: { //账户实名数据
                currKey: "", //
                treeData: [],
                defaultProps: {
                    children: "children",
                    label: "orgName"
                },
                queryData: {
                    account: "",//用户账号
                    loginId: "",//工号
                    realName: "",//姓名
                    orgCode: "", //机构编码
                },
                getUserByOrgId: getUserByOrgId,
                columns: [
                    //列表数据
                    {
                        type: "selection"
                    },
                    {
                        label: "序号",
                        prop: "id"
                    },
                    {
                        label: "姓名",
                        prop: "realName"
                    },
                    {
                        label: "工号",
                        prop: "loginid"
                    },
                    {
                        label: "账号",
                        prop: "account"
                    },
                    {
                        label: "部门",
                        prop: "org_name"
                    },
                ], //列表数据
            },
            userIdStr: "", //选择的用户ID
            selectData: [], //选择的列表
        };
    },
    methods: {
        async getOrgApi() { //获取账户实名下拉树
            const res = await getOrg();
            this.accountName.treeData = res;
            if (res.length > 0) { //默认选择第一个
                this.$nextTick(() => {
                    this.$refs.scBustree.setCurrentKey(res[0].orgCode)
                })
                this.accountName.queryData.orgCode = res[0].orgCode;
                this.$refs.ANtableRef.refresh();
            }
        },
        ANChangeTree(data) { //点击获取账户实名下拉树
            this.accountName.queryData.orgCode = data.orgCode;
            this.$refs.ANtableRef.refresh();
        },
        changeList() {
            this.$refs.ANtableRef.refresh();
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.orgName.indexOf(value) !== -1;
        },
        selectionChange(data) {
            this.selectData = data;
            let currData = []
            data.forEach((curr) => {
                currData.push(curr.id);
            })
            this.userIdStr = currData.join(",");
        },
        async sureAdd() { //确定添加
            if (this.selectData.length === 0) {
                this.$message({
                    message: '请选择成员！',
                    type: 'warning'
                });
                return;
            }
            let api = addRoleMember;
            let queryData = {
                roleId: this.roleId,
                userIdStr: this.userIdStr
            }
            if (this.teamId) { //用户组
                api = addUserMember;
                queryData = {
                    teamId: this.teamId,
                    userIdStr: this.userIdStr
                }
            }
            const res = await api(queryData);
            if (res.msg === 'success') {
                this.$message.success("新增成功！")
            } else {
                this.$message.error(res.msg)
            }
            this.isShow = false;
            this.$emit("updateList") //更新列表

        }
    }
};
</script>

<style lang="scss" scoped>
</style>