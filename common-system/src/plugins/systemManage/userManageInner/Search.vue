<template>
    <div class="typeList">
        <el-select
            v-model="value1"
            multiple
            collapse-tags
            @change="changeSearch"
            placeholder="请选择搜索条件"
        >
            <el-option
                v-for="(item, index) in configSearch"
                :key="index"
                :label="item.name"
                :value="item.id"
            >
            </el-option>
        </el-select>
        <div class="el-checkbox-group">
            <span
                class="lableCheckbox"
                :key="index"
                v-for="(item, index) in searchList"
            >
                <el-checkbox
                    v-model="item.isUse"
                    :label="item.name"
                ></el-checkbox>
                <el-input
                    v-if="item.type == 'input'"
                    v-model="queryData[item.value]"
                    placeholder="请输入内容"
                    style="width:120px;"
                ></el-input>
                <el-select
                    v-if="item.type == 'select'"
                    v-model="queryData[item.value]"
                    style="width:100px;"
                >
                    <el-option
                        v-for="item in item.options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-date-picker
                    v-if="item.type == 'daterange'"
                    v-model="queryData[item.value]"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                >
                </el-date-picker>
            </span>
        </div>
        <el-button
            type="primary"
            class="search"
            @click="searchMeth"
        >搜索</el-button>
    </div>
</template>

<script>
import app from "./eventBus.js";
import { changeDate } from "@/utils/tools.js"
export default {
    props: {
        query: {
            type: Object
        }
    },
    data() {
        return {
            // 条件查询
            value1: [],
            searchList: [], //选择的搜索列表
            queryData: {
                //列表请求参数
                account: "",//
                alias: "",//
                name: "",//
                status: "",//
            },
            configSearch: [
                {
                    id: 1,
                    name: "账号",
                    type: "input",
                    value: "account",
                    isUse: true
                }, {
                    id: 2,
                    name: "别名",
                    type: "input",
                    value: "alias",
                    isUse: true
                }, {
                    id: 3,
                    name: "姓名",
                    type: "input",
                    value: "name",
                    isUse: true
                }, {
                    id: 4,
                    name: "注册时间",
                    type: "daterange",
                    value: "time",
                    isUse: true
                }, {
                    id: 5,
                    name: "状态",
                    type: "select",
                    value: "status",
                    isUse: true,
                    options: [{
                        value: '',
                        label: '全部'
                    }, {
                        value: 1,
                        label: '启用'
                    }, {
                        value: 0,
                        label: '禁用'
                    }]
                }
            ], //搜索字段
            updeteList: Function,
        }
    },
    created() {
        app.$on("updeteList", (fun) => {
            this.updeteList = fun;
        })
    },
    watch: {
        queryData: {
            handler(data) {
                app.$emit("queryData", data)
            },
            deep: true
        }
    },
    methods: {
        changeSearch(val) { //选择搜索条件
            this.searchList = this.configSearch.filter((curr) => {
                if (val.includes(curr.id)) {
                    return curr
                } else {
                    this.queryData[curr.value] = "";
                }
            })
        },
        searchMeth() {
            // 搜索方法
            this.searchList.forEach((curr) => {
                if (!curr.isUse) {
                    this.queryData[curr.value] = ""
                }
            })
            if (this.queryData.time) {
                this.queryData.startTime = changeDate(this.queryData.time[0], true)
                this.queryData.endTime = changeDate(this.queryData.time[1], true)
            } else {
                this.queryData.startTime = "";
                this.queryData.endTime = "";
            }
            delete this.queryData.time;
            app.$emit("queryData", this.queryData)
            this.updeteList();
        }
    }
}
</script>

<style lang="scss" scoped>
.typeList {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    .el-checkbox-group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 0.8;
        .lableCheckbox {
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .el-checkbox {
            margin: 0 10px;
        }
    }
    .search {
        margin-left: 15px;
    }
}
</style>