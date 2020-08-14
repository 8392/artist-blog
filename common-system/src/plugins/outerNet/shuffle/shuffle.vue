<template>
    <div class="shuffle common-pagination1">
        <common-title
            titleBig="外网管理"
            titleSmall="轮播图"
        ></common-title>
        <div class="common-type">
            <div class="type-option">
            </div>
            <ul class="type-tool">
                <li @click="addMeth"><i class="el-icon-circle-plus"></i>新增</li>
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
            <template #fje="scope">
                <a
                    class="annex_scope"
                    :href="scope.row.annexUrl"
                >{{scope.row.annexName}}</a>
            </template>
        </TableList>
        <edit
            v-model="lookInfo"
            v-if="lookInfo"
            @updateList="updateList"
            :pageType="pageType"
        />
    </div>
</template>

<script>
const edit = () => import("./edit.vue");
import { getList, deleteList } from "@/api/outerNet/shuffle";

export default {
    name: "shuffle",
    components: {
        edit
    },
    data() {
        return {
            queryData: {},
            getList: getList,
            columns: [
                //列表数据
                {
                    type: "selection"
                },
                {
                    label: "图片介绍",
                    prop: "intro"
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
            lookInfo: false,
            pageType: 'add',
            // 删除列表(删除框)
            selectTable: [],
            selectTableId: []
        }

    },
    methods: {
        addMeth() {
            // 新增
            this.pageType = 'add';
            this.lookInfo = true;
        },
        updateList() {
            //更新列表
            this.$refs.tableRef.refresh();
        },
        delMeth() {
            if (this.selectTable.length === 0) {
                this.$message.warning("请选择服务指南！")
                return
            }
            let list = [];
            this.selectTable.forEach((curr) => {
                list.push(curr.intro);
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
.add_upload_files_btn {
    width: 65px;
    height: 32px;
    cursor: pointer;
    padding-left: 9px;
    margin-left: 7px;
    opacity: 0;
}

.annex_scope {
    color: blue;
}

.pagination {
    margin-top: 25px;
}

.dialog-footer {
    margin-left: 100px;
}
</style>
