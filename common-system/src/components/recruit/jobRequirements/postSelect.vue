<template>
    <base-dialog
        :title="config.title"
        :visible.sync="isShow"
        append-to-body
        width="450px"
    >
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            highlight-current-row
            @current-change="handleSelectionChange"
        >
            <el-table-column
                label="编码"
                width="120"
            >
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="名称"
            >
            </el-table-column>
            <el-table-column
                v-if="config.id === 2"
                prop="name"
                label="版本号"
            >
            </el-table-column>
        </el-table>
        <span
            slot="footer"
            class="dialog-footer"
        >
            <el-button
                size="medium"
                type="warning"
                @click="handleEvent('cancel')"
            >取 消</el-button>
            <el-button
                size="medium"
                type="primary"
                @click="handleEvent('save')"
            >保 存</el-button>
        </span>
    </base-dialog>
</template>

<script>
let config = {
    job: { id: 1, title: "岗位选取" },
    resume: { id: 2, title: "简历模板选取" }
};
export default {
    props: {
        openSelect: {
            type: Boolean
        },
        selectType: {
            type: String
        }
    },
    model: {
        prop: "openSelect",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    created() {
        this.isShow = this.openSelect;
        this.config = config[this.selectType];
    },
    mounted() {
        this.$nextTick(() => {
            console.log("this.$refs.multipleTable", this.$refs.multipleTable);
            this.$refs.multipleTable.setCurrentRow(this.tableData[2]);
        });
    },
    data() {
        return {
            isShow: false,
            config: {},
            tableData: [
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                }
            ]
        };
    },
    methods: {
        handleEvent() {},
        handleSelectionChange(data) {
            console.log(data);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>