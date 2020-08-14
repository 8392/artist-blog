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
                    <el-form-item label="标题:">
                        <el-input v-model="queryData.handline"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="15">
                    <el-form-item label="描述:">
                        <el-input
                            type="textarea"
                            v-model="queryData.describe"
                            :autosize="{minRows:5,maxRows:8}"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="15">
                    <el-form-item label="附件:">
                        <UploadBtn
                            title="选择文档"
                            @upload="uploadImpg"
                        />
                        <font style="display:block;padding-top:10px;color:#aaa">&emsp;<font style="padding-top: 2px;">注意:Word、Excel、PPT、PDF、压缩包、图片格式</font>
                        </font>
                        <div class="uploadFile">
                            <div
                                @click="dowLoad(item)"
                                class="uploadFile-list"
                                :key="index"
                                v-for="(item, index) in fileList"
                            >
                                <img :src="item.url">
                                <span>{{item.fileName}}</span>
                            </div>
                        </div>
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
                    <el-form-item
                        prop="dep"
                        label="添加时间:"
                    >
                        <el-date-picker
                            v-model="queryData.create_time"
                            disabled
                            type="date"
                            placeholder="请选择日期"
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
import { changeBase64, changeFormData, judgeFile } from "@/utils/tools"
import { getDetail, save, update } from "@/api/outerNet/guide";

const config = {
    add: {
        id: 1,
        title: '新增服务指南',
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
        this.queryData.create_time = new Date()
        this.config = config[this.pageType]
        if (this.config.id == 2) { //编辑回显接口
            this.getDetailApi();
        }
        this.isShow = this.lookInfo;
    },
    data() {
        return {
            isShow: false,
            config: {},
            queryData: {
                annex_uplode_file: [],//附件
                describe: "",//描述
                handline: "",//标题
                id: "",//服务指南主键
            },
            fileList: [],
            uploadImg: "",
            delete_copyright_files: "",
        };
    },
    methods: {
        uploadImpg(file, fileName) {
            this.queryData.annex_uplode_file = file
            this.$set(this.fileList, 0, {
                url: judgeFile(fileName),
                fileName: file.name.slice(0, file.name.indexOf("."))
            })
            // this.fileList.push({
            //     url: judgeFile(fileName),
            //     fileName: file.name.slice(0, file.name.indexOf("."))
            // })
        },
        async getDetailApi() {
            let res = await getDetail({ id: this.id });
            let fileName = JSON.parse(res.annex_file)[0].annex_name;
            let a = fileName.slice(0, fileName.indexOf("."))
            let b = fileName.slice(fileName.lastIndexOf(".") + 1, fileName.length)
            this.$set(this.fileList, 0, {
                url: judgeFile(b),
                fileName: a,
                dowUrl: JSON.parse(res.annex_file)[0]
            })
            this.queryData = res;
            this.delete_copyright_files = JSON.parse(this.queryData.annex_file)[0].annex_id;
        },
        async saveMeth() {
            if (this.config.id == 1) {
                // 新增
                this.queryData.delete_copyright_files = 1;
            } else {
                // 修改
                this.queryData.delete_copyright_files = this.delete_copyright_files
            }
            if (this.config.id == 1 && this.queryData.annex_uplode_file.length == 0) {
                this.$message.warning("请选择文档上传！")
                return
            }
            const queryData = changeFormData(this.queryData);
            const res = await this.config.api(queryData);
            this.$message.success(this.config.msg)
            this.$emit("updateList")
            this.isShow = false
        },
        dowLoad(item) {
            // 下载
            if (item.dowUrl) {
                window.location.href = item.dowUrl.annex_file
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.uploadFile {
    &-list {
        display: flex;
        align-items: center;
        cursor: pointer;
        span {
            font-size: 14px;
            text-decoration: underline;
            color: rgba(88, 86, 214, 1);
            line-height: 27px;
            margin-left: 5px;
        }
    }
}
</style>