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
                        prop="link_name"
                        label="名称:"
                    >
                        <el-input
                            v-model="queryData.link_name"
                            placeholder=""
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="15">
                    <el-form-item
                        prop="linkUrl"
                        label="链接地址:"
                    >
                        <el-input
                            v-model="queryData.link_address"
                            placeholder=""
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="图片:">
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
                            v-model="queryData.create_date"
                            type="date"
                            disabled
                            value-format="yyyy-MM-dd"
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
import { getDetail, save, update } from "@/api/outerNet/link";

const config = {
    add: {
        id: 1,
        title: '新增友情链接',
        api: save,
        msg: "新增成功！"
    },
    edit: {
        id: 2,
        title: '编辑友情链接',
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
        },
        id: {
            type: [String, Number]
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
        this.queryData.create_date = new Date()
        this.config = config[this.pageType]
        if (this.config.id == 2) { //编辑回显接口
            this.getDetailApi();
        } else {
            this.uploadImg = uploadImg
        }
        this.isShow = this.lookInfo;
    },
    data() {
        return {
            isShow: false,
            queryData: {
                descrilbe: '',//描述
                link_address: '',//地址
                link_image_file: '',//链接图片文件
                link_name: '',//名称
            },
            uploadImg: "", //上传图片的base64
        };
    },
    methods: {
        async getDetailApi() { //获取详情接口
            let res = await getDetail({ id: this.id });
            if (res.file_paths) {
                this.uploadImg = res.file_paths
            } else {
                this.uploadImg = uploadImg
            }
            this.queryData = res;
        },
        async saveMeth() {
            if (!this.queryData.link_image_file) {
                this.$message.warning("请上传图片！")
                return
            }
            this.queryData.delete_link_files = 1;
            const queryData = changeFormData(this.queryData);
            const res = await this.config.api(queryData);
            this.$message.success(this.config.msg)
            this.$emit("updateList")
            this.isShow = false;
        },
        async uploadImpg(file) { //图片转base64
            this.queryData.link_image_file = file;
            this.uploadImg = await changeBase64(file)
        },
    }
};
</script>

<style lang="scss" scoped>
</style>