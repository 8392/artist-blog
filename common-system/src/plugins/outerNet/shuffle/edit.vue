<template>
    <base-dialog
        :title="config.title"
        :visible.sync="isShow"
        width="750px"
    >
        <el-form
            label-position="left"
            label-width="100px"
            style="padding-top: 32px;"
        >
            <el-row>
                <el-col :span="15">
                    <el-form-item
                        prop="title"
                        label="图片简介:"
                    >
                        <el-input
                            v-model="queryData.intro"
                            placeholder=""
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="轮播图:">
                        <UploadBtn @upload="uploadImpg" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item>
                        <el-image
                            style="width:400px;height:150px"
                            :src="uploadImg"
                            fit="scale-down"
                        ></el-image>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="添加人:">
                        <el-input
                            disabled
                            v-model="queryData.create_user_name"
                            placeholder=""
                        ></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="添加时间:">
                        <el-date-picker
                            v-model="queryData.create_time"
                            disabled
                            type="date"
                            placeholder="请选择日期"
                            style="width:203px;"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span
            slot="footer"
            class="dialog-footer"
        >
            <el-button
                size="medium"
                type="primary"
                @click="saveMeth"
            >保存</el-button>
        </span>
    </base-dialog>
</template>

<script>
const uploadImg = require("@/assets/img/noImage.png");//默认图片
import { changeBase64, changeFormData } from "@/utils/tools"
import { save, update } from "@/api/outerNet/shuffle";

const config = {
    add: {
        id: 1,
        title: '轮播图维护',
        api: save,
        msg: "新增成功！"
    },
    edit: {
        id: 2,
        title: '编辑服务指南',
        api: update,
        msg: "编辑成功！"
    }
}
export default {
    props: {
        pageType: {
            type: String
        },
        lookInfo: {
            type: Boolean
        }
    },
    model: {
        prop: "lookInfo",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    created() {
        this.queryData.create_time = new Date()
        this.config = config[this.pageType]
        this.isShow = this.lookInfo;
    },
    data() {
        return {
            isShow: false,
            queryData: {
                carousel_image_file: "",//轮播图
                create_time: "",//	添加时间
                create_user_id: "1",//添加用户id
                create_user_name: "",//添加用户姓名
                intro: "",//	简介
            },
            uploadImg: uploadImg, //上传图片的base64
            isUpload: false,
        };
    },
    methods: {
        async uploadImpg(file) {
            this.queryData.carousel_image_file = file;
            this.uploadImg = await changeBase64(file)
            this.isUpload = true;
        },
        async saveMeth() {
            if (!this.isUpload) {
                this.$message.warning("请上传图片！")
                return
            }
            const queryData = changeFormData(this.queryData);
            const res = await this.config.api(queryData);
            this.$message.success(this.config.msg)
            this.$emit("updateList")
            this.isShow = false;
        },
    }
};
</script>

<style lang="scss" scoped>
</style>