<template>
    <base-dialog
        title="表单设计器"
        :visible.sync="isShow"
        fullscreen
    >
        <template>
            <fm-making-form
                ref="makingform"
                style="height: 800px;"
                preview
                generate-code
                generate-json
                :custom-fields="['tabs']"
            >
                <template slot="action">
                    <!-- 自定义操作区域插槽 -->
                    <el-button
                        type="text"
                        icon="el-icon-upload"
                    >保存</el-button>
                </template>
            </fm-making-form>
        </template>
    </base-dialog>
</template>

<script>
export default {
    props: {
        formShow: {
            type: Boolean
        }
    },
    model: {
        prop: "formShow",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    created() {
        this.isShow = this.formShow;
    },
    data() {
        return {
            isShow: false
        };
    }
};
</script>

<style lang="scss" scoped>
</style>