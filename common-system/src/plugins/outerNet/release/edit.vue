<template>
    <base-dialog
        :title="config.title"
        :visible.sync="isShow"
        width="990px"
    >
        <el-form
            class="postForm"
            label-width="80px"
            label-position="left"
        >
            <el-row>
                <el-col :span="24">
                    <el-form-item
                        prop="title"
                        label="标题名称:"
                    >
                        <el-input
                            v-model="queryData.headline"
                            placeholder=""
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="类型:">
                        <el-select v-model="queryData.type">
                            <el-option
                                label="通知"
                                value="1"
                            ></el-option>
                            <el-option
                                label="公示"
                                value="2"
                            ></el-option>
                            <el-option
                                label="政治制度"
                                value="3"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="开始时间:">
                        <el-date-picker
                            v-model="queryData.start_time"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择日期"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="截止时间:">
                        <el-date-picker
                            v-model="queryData.end_time"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="请选择日期"
                            style="width: 226px;"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <el-form-item label="添加人:">
                        <el-input
                            v-model="queryData.add_user_name"
                            disabled
                            placeholder=""
                            style="width: 216px;"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="添加时间:">
                        <el-date-picker
                            v-model="queryData.add_time"
                            type="date"
                            disabled
                            value-format="yyyy-MM-dd"
                            placeholder="请选择日期"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="24">
                    <el-form-item label="内容:">
                        <div>
                            <vue-ueditor-wrap
                                name="news_content"
                                v-model="queryData.content"
                                :config="myConfig"
                            ></vue-ueditor-wrap>
                        </div>
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
            >保 存</el-button>
        </span>
    </base-dialog>
</template>

<script>

import VueUeditorWrap from "vue-ueditor-wrap";
import { toolbars } from "@/utils/editor_config";
import { getDetail, save, update } from "@/api/outerNet/release";
const config = {
    add: {
        id: 1,
        title: '新增消息',
        api: save,
        msg: "新增成功！"
    },
    edit: {
        id: 2,
        title: '编辑消息',
        api: update,
        msg: "编辑成功！"
    }
}

export default {
    components: {
        VueUeditorWrap
    },
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
        this.config = config[this.pageType]
        // 默认添加时间
        this.queryData.add_time = new Date()
        this.isShow = this.lookInfo;
        if (this.config.id == 2) { //编辑回显接口
            this.getDetailApi();
        }
    },
    data() {
        return {
            isShow: false,
            config: {}, //默认配置
            queryData: { //表单请求的数据   
                add_time: "",//添加时间
                add_user_id: "",//添加用户id
                add_user_name: "",//添加用户名称
                content: "",//	内容
                end_time: "",//截止时间
                headline: "",//标题
                start_time: "",//开始时间
                type: "",//类型
            },
            myConfig: {
                UEDITOR_HOME_URL: '/static/UEditor/',
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 260,
                // 初始容器宽度
                initialFrameWidth: "99%",
                // 关闭自动保存
                enableAutoSave: false,
                elementPathEnabled: false,
                toolbars: [toolbars]
            },
        };
    },
    methods: {
        async getDetailApi() { //获取详情接口
            let res = await getDetail({ id: this.id });
            res.type = String(res.type)
            this.queryData = res;
        },
        async saveMeth() {
            if (!this.queryData.start_time) {
                this.$message.warning("请选择开始时间！")
                return
            }
            if (!this.queryData.end_time) {
                this.$message.warning("请选择截止时间！")
                return
            }
            const res = await this.config.api(this.queryData);
            this.$message.success(this.config.msg)
            this.isShow = false;
            this.$emit("updateList")
        },

    }
};
</script>

<style lang="scss" scoped>
</style>