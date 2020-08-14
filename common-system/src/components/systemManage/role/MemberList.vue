<template>
    <base-dialog
        title="成员列表"
        :visible.sync="isShow"
        width="1200px"
    >
        <div>
            <div class="type">
                <div class="type-option">
                    <el-input
                        placeholder="工号、姓名、账号"
                        v-model="queryData.condition"
                        class="input-with-select"
                    >
                        <el-button
                            @click="updateList"
                            slot="append"
                            icon="el-icon-search"
                        ></el-button>
                    </el-input>
                </div>
                <ul class="type-tool">
                    <li @click="addMemberDialog = true"><i class="el-icon-circle-plus"></i>新增成员</li>
                    <li
                        class="hover-red"
                        @click="deleteMeth"
                    ><i class="el-icon-delete"></i>删除</li>
                </ul>
            </div>
            <TableList
                ref="tableRef"
                :columns="columns"
                :params="queryData"
                :api="getRoleMember"
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
        </div>
        <!-- 添加成员 -->
        <addMember
            :roleId="roleId"
            v-model="addMemberDialog"
            @updateList="updateList"
            v-if="addMemberDialog"
        />
        <!-- 查看用户详情 -->
        <!-- 查看 -->
        <ViewUser
            v-if="lookUser"
            v-model="lookUser"
            :accountId="accountId"
            :userId="userId"
        />
    </base-dialog>
</template>

<script>
const addMember = () => import("@/components/systemManage/userGroup/addMember"); //添加成员
const ViewUser = () => import("@/components/systemManage/userManageInner/ViewUser");

import { getRoleMember, deleteMember } from "@/api/systemManage/role";


export default {
    components: {
        ViewUser,
        addMember
    },
    props: {
        memberDialog: {
            type: Boolean
        },
        roleId: {
            type: [String, Number]
        }
    },
    model: {
        prop: "memberDialog",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    created() {
        this.queryData.roleId = this.roleId;
        this.isShow = this.memberDialog;
    },
    filters: {
        getState(val) {
            if (val == 1)
                return '启用'
            else
                return '禁用'
        }
    },
    data() {
        return {
            isShow: false,
            getRoleMember: getRoleMember,
            queryData: {
                //列表请求数据
                roleId: '',
                orderType: "0",
                orderby: "enable",
                condition: "",//查询条件
            },
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
                    prop: "data_permission"
                },
                {
                    label: "职级",
                    prop: "data_permission"
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
            // 新增成员
            accountId: "",
            userId: "",
            lookUser: false,
            addMemberDialog: false,
            userIdStr: '', //选择的用户
            selectData: [], //选择的列表数据
        };
    },
    methods: {
        See(row) {
            this.userId = row.id;
            this.accountId = row.accountId;
            this.lookUser = true;
        },
        updateList() { //更新列表
            this.$refs.tableRef.refresh();
        },
        selectionChange(data) {
            this.selectData = data;
            let currData = []
            data.forEach((curr) => {
                currData.push(curr.id);
            })
            this.userIdStr = currData.join(",");
        },
        async deleteMeth() { //删除成员方法
            if (this.selectData.length === 0) {
                this.$message.warning("请选择成员！")
                return;
            }
            this.$delConfirm({
                type: "delMes",
                beforeClose: async done => {
                    const res = await deleteMember({
                        roleId: this.roleId,
                        userIdStr: this.userIdStr
                    });
                    done();
                    this.$message.success("删除成功！")
                    this.updateList(); //更新列表
                }
            }).catch(() => { });
        },
    }
};
</script>

<style lang="scss" scoped>
.type {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    .type-tool {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        li {
            margin-left: 23px;
            color: #1f1e34;
            font-size: 14px;
            font-weight: 400;
            color: rgba(31, 30, 52, 1);
            cursor: pointer;
            &:hover {
                color: #1f9d2b;
            }
            &.hover-red {
                &:hover {
                    color: #ef5454;
                }
            }
            i {
                margin-right: 8px;
                font-size: 16px;
            }
        }
    }
}
.tree-header {
    .el-input__inner {
        border: none;
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        border-radius: 0;
    }
}
</style>