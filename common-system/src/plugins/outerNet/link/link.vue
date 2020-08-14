<template>
    <div class="link common-pagination1">
        <common-title
            titleBig="外网管理"
            titleSmall="友情链接"
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
import { getList, deleteList } from "@/api/outerNet/link";

export default {
    name: "linkName",
    components: {
        edit
    },
    data() {
        return {
            pageType: 'add',
            lookInfo: false,
            queryData: {},
            getList: getList,
            columns: [
                //列表数据
                {
                    type: "selection"
                },
                {
                    label: "名称",
                    prop: "link_name"
                },
                {
                    label: "地址",
                    prop: "link_address"
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
            currId: ""
        };
    },
    created() { },
    methods: {
        addMeth() {
            // 新增
            this.pageType = 'add';
            this.lookInfo = true;
        },
        editMeth() {
            if (this.selectTable.length === 0) {
                this.$message.warning("请选择友情链接！")
                return
            } else if (this.selectTable.length > 1) {
                this.$message.warning("只能选择一条友情链接编辑！")
                return
            }
            this.currId = this.selectTable[0].id;
            //编辑
            this.pageType = 'edit';
            this.lookInfo = true;
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
            // console.log(this.selectTableId)
        },
        //点击事件 1-新增 2-修改 3-删除
        delMeth() {
            if (this.selectTable.length === 0) {
                this.$message.warning("请选择友情链接！")
                return
            }
            let list = [];
            this.selectTable.forEach((curr) => {
                list.push(curr.link_name);
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
    }
};
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
</style>
