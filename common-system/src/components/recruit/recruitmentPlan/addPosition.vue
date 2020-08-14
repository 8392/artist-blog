<template>
    <base-dialog
        title="添加招聘岗位"
        append-to-body
        :visible.sync="isShow"
        width="1000px"
    >
        <div class="tableHeader">
            <div class="tableHeader-form">
                <div class="tableHeader-form-list">
                    <div class="tableHeader-form-list-lable">岗位需求名称：</div>
                    <div class="tableHeader-form-list-item">
                        <el-input
                            v-model="input"
                            placeholder="请输入内容"
                        ></el-input>
                    </div>
                </div>
                <div class="tableHeader-form-list">
                    <div class="tableHeader-form-list-lable">岗位名称：</div>
                    <div class="tableHeader-form-list-item">
                        <el-input
                            v-model="input"
                            placeholder="请输入内容"
                        ></el-input>
                    </div>
                </div>
                <div class="tableHeader-form-list">
                    <div class="tableHeader-form-list-lable">用人部门：</div>
                    <div class="tableHeader-form-list-item">
                        <el-input
                            v-model="input"
                            placeholder="请输入内容"
                        ></el-input>
                    </div>
                </div>
                <div class="tableHeader-form-list">
                    <el-button type="primary">查询</el-button>
                </div>
            </div>
        </div>
        <TableList
            :columns="columns"
            :params="queryData"
        >

        </TableList>
    </base-dialog>
</template>

<script>
export default {
    props: {
        positionShow: {
            type: Boolean
        }
    },
    model: {
        prop: "positionShow",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    created() {
        this.isShow = this.positionShow;
    },
    data() {
        return {
            isShow: false,
            input: "",
            queryData: {},
            columns: [
                //列表数据
                {
                    type: "selection"
                },
                {
                    label: "岗位需求编号",
                    prop: "account"
                },
                {
                    label: "岗位需求名称",
                    prop: "title"
                },
                {
                    label: "岗位名称",
                    prop: "enable"
                },
                {
                    label: "创建时间",
                    prop: "initpwd"
                },
                {
                    label: "更新时间",
                    prop: "initpwd"
                },
                {
                    label: "用人部门",
                    prop: "start_time"
                },
                {
                    label: "联系人",
                    prop: "initpwd"
                },
                {
                    label: "联系方式",
                    prop: "end_time"
                }
            ] //列表数据
        };
    }
};
</script>

<style lang="scss" scoped>
</style>