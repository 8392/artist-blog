<template>

    <div class="roleManage common-pagination1">
        <common-title
            titleBig="系统管理"
            titleSmall="角色管理"
        ></common-title>
        <div class=" type">
            <div class="type-option">
                <el-input
                    placeholder="角色名"
                    v-model="queryData.role_name"
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
                <li @click="handleEvent('add')"><i class="el-icon-circle-plus"></i>新增用户</li>
                <li
                    @click="deleteMethod"
                    class="hover-red"
                ><i class="el-icon-delete"></i>删除</li>
            </ul>
        </div>
        <div class="tableBox">
            <TableList
                ref="tableRef"
                :columns="columns"
                :params="queryData"
                :api="getRolePage"
                @selection-change="selectionChange"
            >
                <template #cz="scope">
                    <el-button
                        @click="See(scope.row)"
                        type="text"
                        size="medium"
                    >查看</el-button>
                    <el-button
                        @click="handleEvent('edit', scope.row)"
                        type="text"
                        size="medium"
                    >编辑</el-button>
                    <el-button
                        @click="empower(scope.row)"
                        type="text"
                        size="medium"
                    >授权</el-button>
                    <!-- <el-button
                        @click="business(scope.row)"
                        type="text"
                        size="medium"
                    >业务范围</el-button> -->
                    <el-button
                        @click="member(scope.row)"
                        type="text"
                        size="medium"
                    >成员</el-button>
                    <el-button
                        @click="copyButton(scope.row)"
                        type="text"
                        size="medium"
                    >复制</el-button>
                </template>
            </TableList>
        </div>
        <!-- 查看用户详情 -->
        <ViewRole
            v-if="detailsDialog"
            :editData="editData"
            v-model="detailsDialog"
        />
        <!-- 编辑新增角色 -->
        <EditRole
            v-if="editDialog"
            @updateList="updateList"
            :editData="editData"
            v-model="editDialog"
        />
        <MemberList
            v-if="memberDialog"
            v-model="memberDialog"
            :roleId="roleId"
            @updateList="updateList"
        />
        <!-- 授权 -->
        <base-dialog
            title="授权"
            :visible.sync="powerDialog"
            width="750px"
        >
            <div class="addUser">
                <el-form
                    label-width="50px"
                    class="demo-ruleForm"
                >
                    <el-form-item label="权限">
                        <PowerList
                            ref="poweRef"
                            :id="roleId"
                            pageType="role"
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
        </base-dialog>
        <!-- 业务范围 -->
        <el-dialog
            title="业务范围"
            :visible.sync="businessDialog"
            width="500px"
        >
            <div class="addUser">
                <el-form
                    :model="businessFrom"
                    ref="businessFrom"
                    label-width="80px"
                    class="demo-ruleForm"
                >
                    <el-form-item
                        label="角色名称"
                        prop="name"
                    >
                        <el-input
                            type="text"
                            v-model="businessFrom.name"
                        ></el-input>
                    </el-form-item>

                    <el-form-item
                        label="角色描述"
                        prop="describe"
                    >
                        <el-input
                            type="textarea"
                            v-model="businessFrom.describe"
                        ></el-input>
                    </el-form-item>
                    <el-form-item
                        label="业务范围"
                        prop="scope"
                    >
                        <el-radio-group v-model="businessFrom.scope">
                            <el-radio label="本部门"></el-radio>
                            <el-radio label="自定义"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div
                    v-if="businessFrom.scope=='自定义'"
                    class="showTree"
                >
                    <el-tree
                        :data="businessFrom.data"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="[5,8]"
                        :props="businessFrom.defaultProps"
                    >
                    </el-tree>
                </div>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    size="medium"
                    type="warning"
                    @click="businessDialog=false"
                >取消</el-button>
                <el-button
                    size="medium"
                    type="primary"
                    @click="businessDialog=false"
                >确认</el-button>
            </span>
        </el-dialog>
        <!-- 成员 -->

        <!-- 复制 -->
        <el-dialog
            title="复制角色"
            :visible.sync="copyDialog"
            width="450px"
        >
            <div class="addUser">
                <el-form
                    :model="addFrom"
                    ref="addFrom"
                    label-width="80px"
                    class="demo-ruleForm"
                >
                    <el-form-item
                        label="角色名称"
                        prop="name"
                    >
                        <el-input
                            type="text"
                            v-model="copyFrom.roleName"
                        ></el-input>
                    </el-form-item>

                    <el-form-item
                        label="角色描述"
                        prop="describe"
                    >
                        <el-input
                            type="textarea"
                            v-model="copyFrom.roleDescription"
                        ></el-input>
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
                    @click="copyDialog=false"
                >取消</el-button>
                <el-button
                    size="medium"
                    type="primary"
                    @click="copyMeth"
                >确认</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
const ViewRole = () => import("@/components/systemManage/role/ViewRole.vue");
const EditRole = () => import("@/components/systemManage/role/EditRole.vue");
const MemberList = () => import("@/components/systemManage/role/MemberList.vue");
import { getRolePage, copy, deleteRole } from "@/api/systemManage/role";
import { powerRole } from "@/api/common";

export default {
    name: "roleManage",
    components: {
        ViewRole,
        EditRole,
        MemberList
    },
    data() {
        return {
            // 自定义搜索
            getRolePage: getRolePage, //列表接口
            queryData: {
                //列表请求数据
                role_name: "",//角色名
            },
            columns: [
                //列表数据
                {
                    type: "selection"
                },
                {
                    label: "序号",
                    prop: "role_id"
                },
                {
                    label: "角色名",
                    prop: "role_name"
                },
                {
                    label: "角色描述",
                    prop: "role_describe_info"
                },
                {
                    label: "权限范围",
                    prop: "permission_info"
                },
                // {
                //     label: "业务范围",
                //     prop: "data_permission"
                // },
                {
                    label: "操作",
                    slotName: "cz",
                    width: "240px"
                }
            ], //列表数据
            editData: {
                currType: 'add',
                role_id: ''
            },
            // 查看用户详情
            detailsDialog: false,
            // 编辑用户弹框
            editDialog: false,
            // 权限详情
            powerDialog: false,
            // 业务范围
            businessDialog: false,
            businessFrom: {
                name: "",
                describe: "",
                scope: "自定义",
                data: [
                    {
                        id: 1,
                        label: "一级 1",
                        children: [
                            {
                                id: 4,
                                label: "二级 1-1",
                                children: [
                                    {
                                        id: 9,
                                        label: "三级 1-1-1"
                                    },
                                    {
                                        id: 10,
                                        label: "三级 1-1-2"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: 2,
                        label: "一级 2",
                        children: [
                            {
                                id: 5,
                                label: "二级 2-1"
                            },
                            {
                                id: 6,
                                label: "二级 2-2"
                            }
                        ]
                    },
                    {
                        id: 3,
                        label: "一级 3",
                        children: [
                            {
                                id: 7,
                                label: "二级 3-1"
                            },
                            {
                                id: 8,
                                label: "二级 3-2"
                            }
                        ]
                    }
                ],
                defaultProps: {
                    children: "children",
                    label: "label"
                }
            },
            // 成员
            memberDialog: false,
            addFrom: {
                name: "",
                idnumber: "",
                describe: ""
            },
            adduserInnerDialog: false,
            defaultProps: {
                children: "children",
                label: "label"
            },
            // tree关键字过滤
            filterText: "",
            // 复制角色弹框
            copyDialog: false,
            selectTableId: [], //角色ID
            selectTableData: [],
            roleId: "",
            copyFrom: { //复制数据
                roleId: "",
                roleName: "",
                roleDescription: ""
            }
        };
    },
    created() {

    },
    mounted() {
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        handleEvent(type, data) { //新增角色
            this.editData.currType = type;
            switch (type) {
                case 'add':
                    break
                case 'edit':
                    this.editData.role_id = data.role_id;
            }
            this.editDialog = true
        },
        updateList() { //更新列表信息
            this.$refs.tableRef.refresh();
        },
        async copyMeth() { //复制确定
            await copy(this.copyFrom);
            this.$message.success("复制成功！");
            this.copyDialog = false;
        },
        async powerMeth() {
            const privilegeIdArray = this.$refs.poweRef.getShowPower()
            const res = await powerRole({
                operatorId: 1,
                roleId: this.roleId,
                privilegeIdArray
            })
            this.powerDialog = false;
            this.$message.success("授权成功！")
        },
        deleteMethod() {
            if (this.selectTableData.length === 0) {
                this.$message.warning("请选择角色！")
                return;
            }
            let list = [];
            this.selectTableData.forEach((curr) => {
                list.push(curr.role_name);
            })
            //删除提示
            this.$delConfirm({
                type: "delete",
                list, //删除的数据
                beforeClose: async done => {
                    await deleteRole({
                        roleIds: this.selectTableId
                    });
                    this.updateList();
                    done();
                    this.$message.success("删除成功！");
                }
            }).catch(() => { });
        },
        selectionChange(data) {
            this.selectTableId = [];
            data.forEach((curr) => {
                this.selectTableId.push(curr.role_id);
            })
            this.selectTableId = this.selectTableId.join(",");
            this.selectTableData = data;
            console.log("选择表格数据", data, this.selectTableId)
        },
        See(data) { //查看详情
            this.editData.role_id = data.role_id;
            this.detailsDialog = true;
        },
        //编辑
        edit(index, row) {
            this.editDialog = true;
            console.log(index, row);
        },
        //授权
        empower(row) {
            this.roleId = row.role_id
            this.powerDialog = true;
        },
        //业务范围
        business(index, row) {
            this.businessDialog = true;
            console.log(index, row);
        },
        //成员
        member(row) {
            this.roleId = row.role_id;
            this.memberDialog = true;
        },
        //复制
        copyButton(row) {
            this.copyFrom = {};
            this.copyFrom.roleId = row.role_id;
            this.copyDialog = true;
        },
    }
};
</script>
<style lang="scss" scoped>
.roleManage {
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
    .tableBox {
        margin-bottom: 30px;
    }
    .memberDialog {
        .type {
            padding: 0 0 15px;
        }
    }
}
.showTree {
    padding-left: 250px;
    .el-tree {
        border: 1px solid #dcdfe6;
        margin-top: -50px;
        padding: 10px 0;
        height: 260px;
        overflow-y: auto;
    }
}
</style>
