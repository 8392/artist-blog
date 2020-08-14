<template>
    <div class="release common-pagination1">
        <common-title
            titleBig="外网管理"
            titleSmall="消息发布"
        ></common-title>
        <div class="common-type">
            <div class="type-option">
            </div>
            <ul class="type-tool">
                <li @click="addMeth"><i class="el-icon-circle-plus"></i>新增</li>
                <li @click="editMeth"><i class="iconfont icon-xiugai"></i>修改</li>
                <li @click="handelEvent('fb')"><i class="el-icon-s-promotion"></i>发布</li>
                <li
                    @click="handelEvent('zz')"
                    class="hover-red"
                ><i class="el-icon-remove"></i>终止</li>
                <li
                    @click="handelEvent('del')"
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
            <template #type="scope">
                {{scope.row.type | typeFil}}
            </template>
            <template #status="scope">
                {{scope.row.status | statusFil}}
            </template>
        </TableList>
        <!-- 编辑，新增 -->
        <edit
            v-model="lookInfo"
            v-if="lookInfo"
            :id="currId"
            :pageType="pageType"
            @updateList="updateList"
        />
    </div>
</template>

<script>
const edit = () => import("./edit.vue");
import { getList, deleteList, publish, termination } from "@/api/outerNet/release";

export default {
    name: "release",
    components: {
        edit
    },
    data() {
        return {
            lookInfo: false,
            queryData: {},
            getList: getList,
            columns: [
                //列表数据
                {
                    type: "selection"
                },
                {
                    label: "标题",
                    prop: "headline"
                },
                {
                    label: "类别",
                    slotName: "type"
                },
                {
                    label: "添加人",
                    prop: "add_user_name"
                },
                {
                    label: "发布时间",
                    prop: "start_time"
                },
                {
                    label: "截止时间",
                    prop: "end_time"
                },
                {
                    label: "是否发布",
                    slotName: "status",
                    width: "100px"
                },
            ], //列表数据
            pageType: 'add', //新增还是编辑类型
            currId: '',
            selectTable: [], //选择的列表
            selectTableId: []
        };
    },
    filters: {
        typeFil(val) {
            let res = '';
            switch (val) {
                case 1:
                    res = '通知'
                    break;
                case 2:
                    res = '公示'
                    break
                case 3:
                    res = '政策制度'
                    break
            }
            return res
        },
        statusFil(val) {
            let res = '';
            switch (Number(val)) {
                case 1:
                    res = '是'
                    break;
                case 0:
                    res = '否'
                    break
            }
            return res
        }
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
                this.$message.warning("请选择消息！")
                return
            } else if (this.selectTable.length > 1) {
                this.$message.warning("只能选择一条消息编辑！")
                return
            }
            this.currId = this.selectTable[0].id;
            //编辑
            this.pageType = 'edit';
            this.lookInfo = true;
        },
        async handelEvent(type) {
            if (this.selectTable.length === 0) {
                this.$message.warning("请选择消息！")
                return
            }
            switch (type) {
                case 'fb':
                    await publish({
                        ids: this.selectTableId
                    });
                    this.$message.success("发布成功！");
                    break;
                case 'zz':
                    await termination({
                        ids: this.selectTableId
                    });
                    this.$message.success("终止成功！");
                    break
                case 'del':  //点击删除按钮操作
                    let list = [];
                    this.selectTable.forEach((curr) => {
                        list.push(curr.headline);
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
                    break
            }
        },
        selectionChange(data) {
            this.selectTable = data;
            this.selectTableId = [];
            data.forEach((curr) => {
                this.selectTableId.push(curr.id);
            })
            this.selectTableId = this.selectTableId.join(",");
        },
        updateList() {
            //更新列表
            this.$refs.tableRef.refresh();
        },
    }
};
</script>

<style lang="scss" scoped>
</style>
