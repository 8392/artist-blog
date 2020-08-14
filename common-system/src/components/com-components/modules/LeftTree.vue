<template>
    <div class="leftTree">
        <div class="org_title">
            <span>{{title}}</span>
            <div v-if="isEdit">
                <i
                    class="el-icon-circle-plus icon_resume_add"
                    @click="handleEvent('add')"
                ></i>
                <i
                    class="iconfont icon-xiugai icon_resume_update"
                    @click="handleEvent('edit')"
                ></i>
            </div>
        </div>
        <el-tree
            :data="treeData"
            :props="defaultProps"
            default-expand-all
            node-key="id"
            :expand-on-click-node="false"
            :filter-node-method="filterNode"
            :highlight-current="true"
            ref="tree"
            @node-click="handleCheckChange"
        >
            <!-- :current-node-key=4 -->
            <div
                class="custom-tree-node"
                slot-scope="{ node, data }"
            >
                <img
                    v-if="node.childNodes.length > 0"
                    src="@/assets/img/filed.png"
                    alt=""
                />
                <span @click="handleNodeClick(node)">{{node.label}}</span>
                <span
                    @click.stop="remove(node, data)"
                    v-if="isEdit"
                >
                    <!-- v-if="node.childNodes.length === 0" -->
                    <img
                        src="@/assets/img/delete.png"
                        class="nav-header-img"
                        style="margin-left: 5px;vertical-align:text-top;"
                    />
                </span>
            </div>
        </el-tree>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        },
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            defaultProps: {
                children: "children",
                label: "label"
            },
            treeData: [
                {
                    id: 1,
                    label: "一级 1",
                    children: [
                        {
                            id: 4,
                            label: "二级 1-1",
                            children: [
                                {
                                    id: 9,
                                    label: "三级 1-1-1"
                                },
                                {
                                    id: 10,
                                    label: "三级 1-1-2"
                                }
                            ]
                        }
                    ]
                },
                {
                    id: 2,
                    label: "一级 2",
                    children: [
                        {
                            id: 5,
                            label: "二级 2-1"
                        },
                        {
                            id: 6,
                            label: "二级 2-2"
                        }
                    ]
                },
                {
                    id: 3,
                    label: "一级 3",
                    children: [
                        {
                            id: 7,
                            label: "二级 3-1"
                        },
                        {
                            id: 8,
                            label: "二级 3-2"
                        }
                    ]
                },
                {
                    id: 4,
                    label: "一级 4",
                    children: [
                        {
                            id: 7,
                            label: "二级 4-1"
                        },
                        {
                            id: 8,
                            label: "二级 4-2"
                        }
                    ]
                },
                {
                    id: 5,
                    label: "一级 5",
                    children: [
                        {
                            id: 7,
                            label: "二级 5-1"
                        },
                        {
                            id: 8,
                            label: "二级 5-2"
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        handleCheckChange(data, checked, indeterminate) {
            console.log("打印handleCheckChange", data, checked, indeterminate);
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleNodeClick() {},
        handleEvent(type) {
            if (type === "add") {
                // 新增
                this.$emit("treeAdd");
            } else {
                // 编辑
                this.$emit("treeEdit");
            }
        },
        remove(node, data) {
            console.log("打印", node, data);
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        }
    }
};
</script>

<style lang="scss" scoped>
.leftTree {
    margin-top: 12px;
    height: 100%;
    /* height: 592px; */
    background: #fff;
    .org_title {
        height: 50px;
        background: rgba(88, 86, 214, 1);
        border-radius: 4px 4px 0px 0px;
        line-height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        span {
            font-size: 15px;
            color: rgba(225, 225, 225, 1);
        }
    }
    .icon_resume_add {
        color: #1f1e34;
        font-size: 16px;
        font-weight: 400;
        color: #b9b8f7;
        cursor: pointer;
    }
    .icon_resume_update {
        margin-left: 20px;
        color: #1f1e34;
        font-size: 16px;
        font-weight: 400;
        color: #b9b8f7;
        cursor: pointer;
    }
    .custom-tree-node {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        > span {
            margin-left: 10px;
        }
    }
}
</style>