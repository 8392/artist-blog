<template>
    <div class="record common-pagination1">
        <common-title
            titleBig="系统管理"
            titleSmall="操作日志"
        ></common-title>

        <el-form
            :inline="true"
            :model="page.log"
            class="demo-form-inline"
            style="margin-top: 20px;"
        >
            <el-form-item
                label="角色:"
                label-width="50px"
            >
                <el-select
                    v-model="page.log.roleName"
                    placeholder="全部"
                >
                    <el-option
                        label="教务处"
                        value="jiaowu"
                    ></el-option>
                    <el-option
                        label="人事处"
                        value="renshi"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item
                label="日志类型:"
                label-width="80px"
            >
                <el-select
                    v-model="page.log.type"
                    placeholder="全部"
                >
                    <el-option
                        label="新增"
                        value="add"
                    ></el-option>
                    <el-option
                        label="修改"
                        value="update"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item style="margin-left: 90px;">
                <el-button
                    type="primary"
                    @click="serch"
                >搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-input
                    style="left: 132%;width: 313px;"
                    type="primary"
                    @click="serch"
                    placeholder="请输入账号、操作时间、日志类型"
                    suffix-icon="el-icon-search"
                ></el-input>
            </el-form-item>
        </el-form>

        <!-- <div class="typeList">   
        <el-autocomplete
                popper-class="my-autocomplete"
                v-model="state"
                :fetch-suggestions="querySearch"
               
                @select="handleSelect">
                <i
                    class="el-icon-edit el-input__icon"
                    slot="suffix"
                    @click="handleIconClick">
                </i>
                <template slot-scope="{ item }">
                    <span class="value" style="margin-right:30px;">{{ item.value }}</span>
                    <span class="name">{{ item.name }}</span>
                </template>
            </el-autocomplete>
        </div>-->
        <!--表头-->
        <div class="tableBox">
            <el-table
                ref="multipleTable"
                :data="tableData"
                stripe
                tooltip-effect="dark"
                style="width: 100%"
            >
                <el-table-column width="55">
                </el-table-column>
                <el-table-column
                    prop="IP"
                    label="登录IP"
                >
                </el-table-column>
                <el-table-column
                    prop="account"
                    label="账号"
                >
                </el-table-column>
                <el-table-column
                    prop="role"
                    label="角色"
                >
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="日志类型"
                >
                </el-table-column>
                <el-table-column
                    prop="time"
                    sortable
                    label="操作时间"
                    show-overflow-tooltip
                    width="240"
                >
                </el-table-column>
                <el-table-column
                    prop="content"
                    label="日志内容"
                    width="120"
                >
                </el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div class="pagination">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: "record",
    data() {
        return {
            page: {
                // 当前页数
                currentPage: 1,
                // 每页数量
                pageSize: 15,
                // 总页数
                totalCounts: 0,
                // 总条数
                total: -1,
                //搜索条件
                log: {
                    roleName: '',
                    type: '',
                    search: '',
                }
            },

            // 用户管理表格
            tableData: [{
                IP: '192.168.0.1',
                account: 20040121,
                role: '角色1',
                type: '新增',
                time: "2018-08-01 11：10：27：00",
                content: '内容111',
            },
            {
                IP: '192.168.0.2',
                account: 20040122,
                role: '角色2',
                type: '新增',
                time: "2018-08-01 12：10：27：00",
                content: '内容112',
            },
            {
                IP: '192.168.0.3',
                account: 20040123,
                role: '角色3',
                type: '修改',
                time: "2018-08-01 13：10：27：00",
                content: '内容113',
            },
            ],

        }
    },
    components: {},
    created() { },
    mounted() { },
    watch: {},
    methods: {
        //搜索
        serch() {

        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        //获取用户列表
        getUserList() { },
        //获取角色列表
        getRoleList() { },
        //获取log日志类型
        getLogTypeList() { },
    }
};
</script>
<style lang="scss" scoped>
.record {
    .tableBox {
        margin-bottom: 30px;
    }
}
</style>
