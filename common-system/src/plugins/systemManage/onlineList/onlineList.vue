<template>

    <div class="userManage common-pagination1">
        <common-title
            titleBig="系统管理"
            titleSmall="在线用户清单"
        ></common-title>
        <div class="typeList">
            <el-autocomplete
                popper-class="my-autocomplete"
                v-model="state"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
            >
                <i
                    class="el-icon-edit el-input__icon"
                    slot="suffix"
                    @click="handleIconClick"
                >
                </i>
                <template slot-scope="{ item }">
                    <span
                        class="value"
                        style="margin-right:30px;"
                    >{{ item.value }}</span>
                    <span class="name">{{ item.name }}</span>
                </template>
            </el-autocomplete>
        </div>
        <div class="tableBox">
            <el-table
                ref="multipleTable"
                :data="tableData"
                stripe
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                    prop="number"
                    sortable
                    label="序号"
                >
                </el-table-column>
                <el-table-column
                    prop="account"
                    sortable
                    label="账号"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    sortable
                    label="姓名"
                >
                </el-table-column>
                <el-table-column
                    prop="time"
                    sortable
                    label="登录时间"
                    show-overflow-tooltip
                    width="240"
                >
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="登录设备类型"
                >
                </el-table-column>
                <el-table-column
                    prop="IP"
                    label="登录IP"
                >
                </el-table-column>
            </el-table>
        </div>
        <div class="pagination">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
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
    name: "userManage",
    data() {
        return {
            // 自定义搜索
            restaurants: [],
            state: '',

            // 用户管理表格
            tableData: [
                {
                    number: 20040123,
                    account: 20040123,
                    name: '张三',
                    time: "2018-08-01 10：10：27：00",
                    type: '新增',
                    IP: '192.168.0.2',
                },
            ],
            // 用户管理表格多选
            multipleSelection: [],
            // 分页器当前页
            currentPage4: 4,

        }
    },
    components: {},
    created() {
    },
    mounted() {
        this.restaurants = this.loadAll();
    },
    watch: {
    },
    methods: {
        // 自定义搜索
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            return [
                { "value": "1234", "name": "张三" },
                { "value": "2356", "name": "李四" },
                { "value": "5647", "name": "赵五" },
                { "value": "2356", "name": "张三" },
                { "value": "5689", "name": "王二" },
                { "value": "4562", "name": "李四" },
                { "value": "5647", "name": "王二" },
                { "value": "2345", "name": "李四" },
                { "value": "9875", "name": "张三" },
                { "value": "8596", "name": "李四" },
                { "value": "5263", "name": "王二" },
            ];
        },
        handleSelect(item) {
            console.log(item);
        },
        handleIconClick(ev) {
            console.log(ev);
        },


        // 表格全选多选
        handleSelectionChange(val) {
            console.log(val)
            this.multipleSelection = val;

        },



        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        // 个人简历选项卡
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
<style lang="scss" scoped>
.userManage {
    .typeList {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-bottom: 15px;
        padding-top: 15px;
    }
    .tableBox {
        margin-bottom: 30px;
    }
}
</style>
