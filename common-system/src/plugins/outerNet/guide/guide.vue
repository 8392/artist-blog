<template>
    <div class="guide common-pagination1">
        <common-title
            titleBig="外网管理"
            titleSmall="服务指南"
        ></common-title>

        <div class="common-type">
            <div class="type-option">
            </div>
            <ul class="type-tool">
                <li @click="addMeth"><i class="el-icon-circle-plus"></i>新增</li>
                <li @click="editMeth"><i class="iconfont icon-xiugai"></i>修改</li>
                <li
                    @click="delMeth"
                    class="hover-red"
                ><i class="el-icon-delete"></i>删除</li>
            </ul>
        </div>
        <TableList
            ref="tableRef"
            :IrregularPage="true"
            :columns="columns"
            :params="queryData"
            :api="getList"
            @selection-change="selectionChange"
        >
            <template #fj="scope">
                <div
                    @click="downLoad(scope.row.annex_file)"
                    class="annex_scope"
                >{{scope.row.annex_file | fjFilt}}</div>
            </template>
        </TableList>
        <edit
            v-model="lookInfo"
            v-if="lookInfo"
            :id="currId"
            @updateList="updateList"
            :pageType="pageType"
        />
    </div>
</template>

<script>
const edit = () => import("./edit.vue");
import { getList, deleteList } from "@/api/outerNet/guide";

export default {
    name: "guide",
    components: {
        edit
    },
    data() {
        return {
            //验证
            lookInfo: false,
            pageType: 'add',
            queryData: {},
            getList: getList,
            columns: [
                //列表数据
                {
                    type: "selection"
                },
                {
                    label: "标题",
                    prop: "handline"
                },
                {
                    label: "描述",
                    prop: "describe"
                },
                {
                    label: "附件",
                    slotName: "fj"
                },
                {
                    label: "添加人",
                    prop: "create_user_name"
                },
                {
                    label: "添加时间",
                    prop: "create_date"
                },
            ], //列表数据
            selectTable: [],
            selectTableId: [],
            currId: ""
        }

    },
    filters: {
        fjFilt(val) {
            // console.log(JSON.parse(val)[0])
            const res = JSON.parse(val)[0].annex_name
            return res.slice(0, res.lastIndexOf("."))
        },
    },
    methods: {
        downLoad(val) {
            window.location.href = JSON.parse(val)[0].file_paths
        },
        addMeth() {
            // 新增
            this.pageType = 'add';
            this.lookInfo = true;
        },
        editMeth() {
            if (this.selectTable.length === 0) {
                this.$message.warning("请选择服务指南！")
                return
            } else if (this.selectTable.length > 1) {
                this.$message.warning("只能选择一条服务指南编辑！")
                return
            }
            this.currId = this.selectTable[0].id;
            //编辑
            this.pageType = 'edit';
            this.lookInfo = true;
        },
        delMeth() {
            if (this.selectTable.length === 0) {
                this.$message.warning("请选择服务指南！")
                return
            }
            let list = [];
            this.selectTable.forEach((curr) => {
                list.push(curr.handline);
            })
            //删除提示
            this.$delConfirm({
                type: "delete",
                list, //删除的数据
                beforeClose: async done => {
                    await deleteList({
                        ids: this.selectTableId
                    });
                    this.updateList();
                    done();
                    this.$message.success("删除成功！");
                }
            }).catch(() => { });
        },
        updateList() {
            //更新列表
            this.$refs.tableRef.refresh();
        },
        // 表格全选多选
        selectionChange(data) {
            this.selectTable = data;
            this.selectTableId = [];
            data.forEach((curr) => {
                this.selectTableId.push(curr.id);
            })
            this.selectTableId = this.selectTableId.join(",");
        },
    },

}
</script>

<style lang="scss" scoped>
.annex_scope {
    cursor: pointer;
    color: blue;
}
</style>
