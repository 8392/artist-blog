<template>
    <div class="copyrightnMaintenance common-pagination1">
        <common-title
            titleBig="外网管理"
            titleSmall="版权维护"
        ></common-title>
        <el-form
            :model="queryData"
            label-position="left"
            label-width="120px"
            style="padding-top: 32px;"
        >
            <el-row>
                <el-col :span="24">
                    <el-form-item label="logo：">
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
                    <el-form-item label="版权信息维护：">
                        <el-input
                            v-model="queryData.copyright_info"
                            placeholder=""
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        style="margin-left: 40px;"
                        label="地址："
                    >
                        <el-input
                            v-model="queryData.addr"
                            placeholder=""
                        ></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="邮编：">
                        <el-input
                            v-model="queryData.post_code"
                            placeholder=""
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        style="margin-left: 40px;"
                        label="联系电话："
                    >
                        <el-input
                            v-model="queryData.phone"
                            placeholder=""
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="服务邮箱：">
                        <el-input
                            v-model="queryData.service_email"
                            placeholder=""
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span class="dialog-footer">
            <el-button
                size="medium"
                type="primary"
                @click="saveMeth"
            >保存</el-button>
        </span>
    </div>
</template>

<script>
const uploadImg = require("@/assets/img/noImage.png");//默认图片
import { changeBase64, changeFormData } from "@/utils/tools"
import { saveCopyrightInfo } from "@/api/outerNet/link";

export default {
    name: "copyrightnMaintenance",
    data() {
        return {
            queryData: {
                addr: '',//地址
                copyright_info: '',//版权信息
                create_time: '',//添加时间
                create_user_id: '',//添加用户id
                create_user_name: '',//添加用户姓名
                phone: '',//联系电话
                post_code: '',//邮编
                service_email: '',//服务邮箱
                copyright_file: '',//版权信息logo
                delete_copyright_files: '1',//待删除版权信息附件id字符串
                id: '',//版权信息主键
            },
            uploadImg: uploadImg, //上传图片的base64
        };
    },
    created() {

    },
    methods: {
        async uploadImpg(file) { //图片上传
            this.queryData.copyright_file = file; //上传流
            this.uploadImg = await changeBase64(file)
        },
        async saveMeth() {
            if (!this.queryData.copyright_file) {
                this.$message.warning("请上传图片！")
                return
            }
            const queryData = changeFormData(this.queryData);
            const res = await saveCopyrightInfo(queryData);
            this.$message.success("保存成功！")
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

.annex_scope {
    color: blue;
}
</style>
