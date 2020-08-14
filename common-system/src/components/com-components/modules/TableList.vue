<template>
    <div class="common-pagination1">
        <el-table
            class="TableList"
            ref="TableList"
            v-loading="loading && res.tables.length == 0"
            v-bind="$attrs"
            :data="res.tables"
            v-on="$listeners"
            :class="{ pointer: pointer }"
        >
            <template v-for="(item, index) in columns">
                <el-table-column
                    v-if="item.slotName"
                    :key="index"
                    show-overflow-tooltip
                    align="center"
                    v-bind="item"
                >
                    <template slot-scope="scope">
                        {{changeDate(scope)}}
                        <slot
                            :name="item.slotName"
                            v-bind="scope"
                        ></slot>
                    </template>
                </el-table-column>
                <el-table-column
                    v-else
                    show-overflow-tooltip
                    align="center"
                    :key="index"
                    v-bind="item"
                ></el-table-column>
            </template>
        </el-table>
        <template>
            <div class="pagination">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="res.currentPage"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageParams.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="res.total"
                >
                </el-pagination>
            </div>
        </template>
    </div>
</template>
<script>
import { testTableApi } from "@/api/systemManage/test/tableList";

export default {
    name: "TableList",
    model: {
        event: "load"
    },
    props: {
        isRequest: {
            type: Boolean,
            default: true
        },
        columns: {
            type: Array,
            default() {
                return [];
            }
        },
        params: {
            type: Object,
            default() {
                return {};
            }
        },
        api: {
            type: Function
        },
        pointer: {
            //行是否显示手指的手势
            type: Boolean,
            default: false
        },
        IrregularPage: { //不规则的page
            type: Boolean
        },
        data: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            loading: false,
            pageParams: {
                currentPage: 1,
                pageSize: 10
            },
            IrrpageParams: {
                page: {
                    currentPage: 1,
                    pageSize: 10,
                }
            },
            queryData: {}, //请求的参数
            testTableApi: testTableApi,
            res: {
                currentPage: 1,
                totalPage: 5,
                pageSize: 10,
                total: 1,
                tables: []
            }
        };
    },
    created() {
        if (this.IrregularPage) {
            this.queryData = Object.assign(this.IrrpageParams, this.params); //组合请求数据
        } else {
            this.queryData = Object.assign(this.pageParams, this.params); //组合请求数据
        }
        if (this.isRequest) {
            this.getList();
        }
    },
    methods: {
        changeDate(data) { },
        async getList() {
            this.loading = true;
            let newRes = await this.api(this.queryData);
            if (!newRes) {
                this.res.tables = [];
                this.loading = false;
                return;
            }
            if (newRes.tables && newRes.tables.length === 0) {
                this.res.tables = [];
                this.loading = false;
                return;
            }
            this.res = newRes.page;
            this.loading = false;
            this.res.tables = newRes.tables;
            this.$emit("update:data", newRes.tables)
        },
        handleSizeChange(val) {
            this.queryData.pageSize = val;
            this.queryData.currentPage = 1;
            this.getList();
        },
        handleCurrentChange(val) {
            //点击当前页
            this.queryData.currentPage = val;
            this.getList();
        },
        async refresh() {
            //刷新
            if (this.IrregularPage) {
                this.queryData = Object.assign(this.IrrpageParams, this.params); //组合请求数据
            } else {
                this.queryData = Object.assign(this.pageParams, this.params); //组合请求数据
            }
            this.queryData.currentPage = 1;
            await this.getList();
        },
        clearSelection() {
            this.$refs.TableList.clearSelection();
        },
        toggleRowSelection(data) {
            this.$refs.TableList.toggleRowSelection(data);
        }
    }
};
</script>
<style lang="scss" scoped>
.pointer .el-table__row {
    cursor: pointer;
}

.TableList {
    margin-bottom: 30px;
}
</style>
