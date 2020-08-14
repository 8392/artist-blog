<template>
    <div class="addUser">
        <base-dialog
            width="1000px"
            :title="config.title"
            :visible.sync="isShow"
            @close="close"
        >
            <div class="addUser">
                <el-form
                    :inline="true"
                    :model="addform"
                    class="demo-form-inline"
                    label-width="70px"
                >
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="用户账号">
                                <el-input
                                    :disabled="config.id == 2"
                                    v-model="addform.account"
                                    placeholder
                                ></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="生效时间">
                                <el-date-picker
                                    v-model="addform.start_time"
                                    value-format="yyyy-MM-dd HH:mm:SS"
                                    type="date"
                                    placeholder="选择日期"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="失效时间">
                                <el-date-picker
                                    v-model="addform.end_time"
                                    value-format="yyyy-MM-dd HH:mm:SS"
                                    type="date"
                                    placeholder="选择日期"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="账号实名">
                                <el-input
                                    :disabled="config.id == 2"
                                    v-model="addform.name"
                                    placeholder
                                ></el-input>
                                <i
                                    v-if="config.id == 1"
                                    class="el-icon-search icon-searchBtn"
                                    @click="openAdduser"
                                ></i>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="工号">
                                <el-input
                                    disabled
                                    v-model="addform.loginId"
                                    placeholder
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="部门">
                                <el-input
                                    v-model="department_name"
                                    disabled
                                    placeholder
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item
                                label="角色"
                                class="col-item "
                            >
                                <el-checkbox-group v-model="addform.role_id">
                                    <el-checkbox
                                        v-for="(item, index) in rolesList"
                                        :key="index"
                                        :label="item.role_id"
                                    >{{item.role_name}}</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item
                                label="用户组"
                                class="col-item "
                            >
                                <el-checkbox-group v-model="addform.team_id">
                                    <el-checkbox
                                        v-for="(item, index) in userList"
                                        :key="index"
                                        :label="item.team_id"
                                    >{{item.team_name}}</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item>
                                <el-button
                                    type="warning"
                                    size="small"
                                >业务范围</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <ul class="treeBox">
                    <li class="treeBox-search">
                        <div class="left">
                            <el-input
                                placeholder="输入关键字进行过滤"
                                v-model="filterText"
                                suffix-icon="el-icon-search"
                            ></el-input>
                        </div>
                        <!-- <div class="treeBox-btnBox">
                            <el-button
                                size="small"
                                round
                                type="warning"
                            >取消</el-button>
                            <el-button
                                size="small"
                                round
                                type="primary"
                            >确定</el-button>
                        </div> -->
                    </li>
                    <li class="treeBox-tree">
                        <el-tree
                            class="filter-tree1"
                            show-checkbox
                            :data="scBusData.treeData"
                            node-key="orgId"
                            :props="scBusData.defaultProps"
                            default-expand-all
                            :default-checked-keys="checkedKeys"
                            :expand-on-click-node="false"
                            :filter-node-method="filterNode"
                            ref="scBustree"
                            @check-change="changeBusiness"
                        ></el-tree>
                    </li>
                </ul>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    size="medium"
                    type="primary"
                    @click="onSubmit"
                >完成</el-button>
            </span>
            <base-dialog
                width="1100px"
                title="账号实名"
                :visible.sync="adduserInnerDialog"
                :append-to-body="true"
            >
                <ul class="realNameBox">
                    <li class="realNameBox-left">
                        <el-tree
                            class="filter-tree"
                            :data="accountName.treeData"
                            node-key="orgCode"
                            :props="accountName.defaultProps"
                            highlight-current
                            default-expand-all
                            :expand-on-click-node="false"
                            ref="treeRef"
                            @node-click="ANChangeTree"
                        ></el-tree>
                    </li>
                    <li class="realNameBox-right">
                        <div class="right-top">
                            <el-form
                                :inline="true"
                                :model="realNameForm"
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
                                <el-form-item>
                                    <el-button
                                        size="medium"
                                        type="primary"
                                        @click="searchMeth"
                                    >搜索</el-button>
                                </el-form-item>
                            </el-form>
                            <div class="tableBox">
                                <TableList
                                    :data.sync="tableData"
                                    ref="ANtableRef"
                                    :isRequest="false"
                                    :columns="accountName.columns"
                                    :params="accountName.queryData"
                                    :api="accountName.getUserByOrgId"
                                    @selection-change="selectionChange"
                                    @select-all="selectAll"
                                    @select="select"
                                >
                                </TableList>
                            </div>
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
                        @click="sureMeth"
                    >完成</el-button>
                </span>
            </base-dialog>
        </base-dialog>
    </div>
</template>

<script>
import { changeDate } from "@/utils/tools";
import { getRoles, getUserTeam, getOrg, getUserByOrgId, addSchoolUser, updateSchoolUser, getUserInfo } from "@/api/systemManage/userManageInner";

const config = {
    add: {
        id: 1,
        title: "新增用户",
        api: addSchoolUser,
        msg: "新增成功！"
    },
    edit: {
        id: 2,
        title: "修改用户",
        api: updateSchoolUser,
        msg: "修改成功！"
    }
}

export default {
    props: {
        adduserDialog: {
            type: Boolean
        },
        accountId: {
            type: [String, Number]
        },
        peroUserId: {
            type: [String, Number]
        },
        pageType: {
            type: String
        }
    },
    model: {
        prop: "adduserDialog",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        },
        "addform.account": {
            handler(data) {
                this.accountName.queryData.account = data;
            }
        },
        filterText(val) {
            this.$refs.scBustree.filter(val);
        }
    },
    data() {
        return {
            isShow: false,
            realNameForm: {
                name: "",
                number: ""
            },
            config: {},// 修改，新增配置数据
            tableData: [],
            adduserInnerDialog: false,
            accountName: { //账户实名数据
                treeData: [],
                defaultProps: {
                    children: "children",
                    label: "orgName"
                },
                queryData: {
                    account: "",//用户账号
                    loginId: "",//工号
                    orgCode: "", //机构编码
                    realName: "",//姓名
                },
                getUserByOrgId: getUserByOrgId,
                columns: [
                    {
                        type: "selection"
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
                        label: "性别",
                        prop: "sexname"
                    },
                    {
                        label: "身份证件类型",
                        prop: "idcardType"
                    },
                    {
                        label: "证件号码",
                        prop: "idcard"
                    },
                    {
                        label: "部门",
                        prop: "org_name"
                    },
                ],
            },
            data: [

            ],
            defaultProps: {
                children: "children",
                label: "label"
            },
            filterText: "",
            checkText: "",
            addform: {
                loginId: "",
                account: "", //用户账号
                name: "", //姓名
                end_time: "", //结束时间
                start_time: "", //开始时间
                department_id: "", //部门id
                email: "", //邮箱号
                papers_type: "", //证件类别
                phone: "", //手机号
                role_id: [], //角色id
                team_id: [], //用户角色组
                user_id: '',//用户id
            },
            department_name: "", //部门名称
            rolesList: [], //角色
            userList: [],//用户组
            ACNselect: [],
            scBusData: { //业务范围
                treeData: [],
                defaultProps: {
                    children: "children",
                    label: "orgName"
                },
            },
            tableKey: "",
            checkedKeys: []
        };
    },
    created() {
        this.config = config[this.pageType] //判断是新增还是修改页面
        this.isShow = this.adduserDialog;
        this.initData();
        this.getRoles(); //获取所有角色
        this.scBusgetOrgApi(); //业务范围
        if (this.config.id == 2) {
            this.getUserInfo();
        }
    },
    methods: {
        async getUserInfo() { //修改获取详情接口
            let res = await getUserInfo({ accountId: this.accountId })
            this.formatEditData(res);
            console.log("详情", res)
        },
        formatEditData(data) { //格式化编辑详情时的数据
            let currObj = {};
            this.department_name = data.orgs[0].org_name;
            this.addform.loginId = data.jobNum //工号
            data.roles.forEach((curr) => {
                this.addform.role_id.push(curr.role_id)
            })
            data.teams.forEach((curr) => {
                this.addform.team_id.push(curr.team_id)
            })
            data.orgs.forEach((curr) => {
                this.checkedKeys.push(curr.id)
            })
            this.$nextTick(() => {
                this.$refs.scBustree.setCheckedKeys(this.checkedKeys);
            })
            let queryArr = ["account", "start_time", "end_time", "name"];
            for (let key in data) {
                if (queryArr.includes(key)) {
                    this.addform[key] = data[key];
                }
            }
        },
        async getRoles() {
            let [rolesList, userList] = await Promise.all([
                getRoles(),
                getUserTeam()
            ]);
            this.rolesList = rolesList;
            this.userList = userList;
        },
        async getOrgApi() { //获取账户实名下拉树
            const res = await getOrg();
            this.accountName.treeData = res;
            if (res.length > 0) { //默认选择第一个
                this.$nextTick(() => {
                    this.$refs.treeRef.setCurrentKey(res[0].orgCode)
                })
                this.accountName.queryData.orgCode = res[0].orgCode;
                this.$refs.ANtableRef.refresh();
            }
        },
        ANChangeTree(data) { //点击获取账户实名下拉树
            this.accountName.queryData.orgCode = data.orgCode;
            this.$refs.ANtableRef.refresh();
        },
        openAdduser() { //打开账号实名
            this.getOrgApi();
            this.adduserInnerDialog = true;
        },
        sureMeth() { //点击账户实名完成
            this.department_name = this.ACNselect.org_name;
            this.addform.user_id = this.ACNselect.id;
            this.addform.loginId = this.ACNselect.loginid;
            this.addform.name = this.ACNselect.realName;
            this.adduserInnerDialog = false;
        },
        selectionChange(val) {
            this.ACNselect = val[0];
        },
        selectAll() {
            this.$refs.ANtableRef.clearSelection(); //这个是清除所有选择项，当选择全部时，清除所有选择项
        },
        select(data, val) {  //做单选操作
            let currIndex = "";
            this.tableData.forEach((curr, index) => {
                if (curr.id == val.id) {
                    currIndex = index;
                }
            });
            this.$refs.ANtableRef.clearSelection();
            if (val.id == this.tableKey) {
                this.tableKey = null;
                this.$refs.ANtableRef.clearSelection();
            } else {
                this.$refs.ANtableRef.toggleRowSelection(this.tableData[currIndex]);
                this.tableKey = val.id;
            }
        },
        async scBusgetOrgApi() {
            const res = await getOrg();
            this.scBusData.treeData = res;
        },
        changeBusiness(data) { //选择业务范围下拉树
        },
        initData() {
            //初始化化日期为当天
            const currDate = new Date();
            this.addform.start_time = changeDate(currDate);
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.orgCode.indexOf(value) !== -1;
        },
        searchMeth() {
            this.$refs.ANtableRef.refresh();
        },
        close() {
            this.isShow = false;
        },
        async onSubmit() {
            const currData = this.$refs.scBustree.getCheckedKeys();
            this.addform.department_id = currData; //获取业务范围
            if (this.config.id == 2) {
                this.addform.account_id = this.accountId;
                this.addform.user_id = this.peroUserId
            } else {
                this.addform.accountId = this.accountId;
            }
            const res = await this.config.api(this.addform);
            this.$emit("updeteList")
            this.isShow = false;
            this.$message.success(this.config.msg);
        }
    }
};
</script>

<style lang="scss" scoped>
// 新增用户
.col-item {
    display: flex;
    justify-content: space-between;
    .el-form-item__content {
        width: calc(100% - 70px);
    }
    // /deep/ .el-form-item__content {
    //     width: calc(100% - 70px);
    // }
}
.addUser {
    .el-form-item {
        margin-bottom: 12px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 200px;
    }
    .el-input--suffix .el-input__inner {
        padding-right: 15px;
    }
    .icon-searchBtn {
        color: #989898;
        font-size: 20px;
        position: absolute;
        top: 10px;
        right: 9px;
        cursor: pointer;
    }
    .treeBox {
        height: 270px;
        .treeBox-search {
            position: relative;
            .right {
                width: 100px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 20px;
                i {
                    margin: 0 5px;
                }
            }
        }
        .treeBox-btnBox {
            width: auto;
            padding-top: 9px;
            text-align: right;
            position: absolute;
            top: 42px;
            right: 20px;
            z-index: 10;
        }
        .treeBox-tree {
            // width: 760px;
            height: 236px;
            border: 1px solid rgba(229, 229, 229, 1);
            border-top: none;
            overflow-y: auto;
        }
    }
}
</style>