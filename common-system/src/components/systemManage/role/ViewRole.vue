<template>
    <base-dialog
        title="角色详情"
        :visible.sync="isShow"
        :append-to-body="true"
        width="750px"
    >
        <div
            class="viewPage"
            v-loading="loading"
        >
            <el-form
                ref="detailsFrom"
                label-width="80px"
                class="demo-ruleForm"
            >
                <el-form-item
                    label="角色名称"
                    prop="name"
                >
                    <el-input
                        type="text"
                        v-model="detailData.role_name"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="角色编号"
                    prop="idnumber"
                >
                    <el-input v-model.number="detailData.role_id"></el-input>
                </el-form-item>

                <el-form-item
                    label="角色描述"
                    prop="describe"
                >
                    <el-input
                        type="textarea"
                        v-model="detailData.role_describe_info"
                    ></el-input>
                </el-form-item>
                <el-form-item label="业务范围">
                    <!-- <div class="showDiv-array">
                        <span
                            v-for="(item,index) in detailData.work"
                            :key="index"
                        >
                            <span>{{item}}</span>
                            <span v-if="index+1 < detailsFrom.work.length">,</span>
                        </span>
                    </div> -->
                    <el-input v-model="detailData.role"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <PowerList
                        ref="poweRef"
                        :isView="true"
                        :id="editData.role_id"
                        pageType="role"
                    />
                </el-form-item>
            </el-form>
        </div>
        <span
            slot="footer"
            class="dialog-footer"
        >
            <el-button
                size="medium"
                type="primary"
                @click="detailsDialog=false"
            >返回</el-button>
        </span>
    </base-dialog>
</template>

<script>
import { roleDetails } from "@/api/systemManage/role";

export default {
    props: {
        detailsDialog: {
            type: Boolean
        },
        editData: {
            type: Object
        }
    },
    model: {
        prop: "detailsDialog",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    created() {
        this.getDetail(); //获取详情接口
        this.isShow = this.detailsDialog;
    },
    data() {
        return {
            isShow: false,
            detailData: {
                data_permission: '', //权限信息
            },
            loading: true,
        };
    },
    methods: {
        async getDetail() {
            this.loading = true;
            const res = await roleDetails({
                roleId: this.editData.role_id
            });
            this.loading = false;
            this.detailData = res;
            console.log("详情", res)
        }
    }
};
</script>

<style lang="scss" scoped>
</style>