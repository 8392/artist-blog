<template>
    <div>
        <el-dialog
            ref="BaseDialog"
            :width="width"
            v-bind="$attrs"
            destroy-on-close
            v-on="$listeners"
            :close-on-click-modal="false"
            :wrapperClosable="wrapperClosable"
        >
            <slot></slot>
            <template #title>
                <slot name="title"></slot>
            </template>
            <template #footer>
                <slot name="footer"></slot>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "BaseDialog",
    props: {
        width: {
            type: String,
            default: "900px"
        },
        wrapperClosable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {};
    },
    methods: {
        closeDrawer() {
            this.$refs.BaseDialog.closeDrawer();
        }
    }
};
</script>

<style lang="scss" scoped>
.el-drawer__body {
    overflow: auto;
    // padding: 10px;
}
.el-drawer__header {
    border-bottom: 1px solid #ddd;
    margin-bottom: 0;
    padding: 15px;
}
</style>
