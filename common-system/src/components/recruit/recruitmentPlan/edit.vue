<template>
    <base-dialog
        title="修改"
        append-to-body
        :visible.sync="isShow"
        width="1100px"
    >
        <el-form
            class="basicData"
            label-width="110px"
            :model="lookBasicDataFrom"
            :rules="rules"
            :ref="lookBasicDataFrom"
        >
            <el-row>
                <el-col :span="8">
                    <el-form-item
                        prop="userNumber"
                        label="计划编号："
                    >
                        <el-input
                            v-model="lookBasicDataFrom.userNumber"
                            placeholder=""
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        prop="userName"
                        label="计划名称："
                    >
                        <el-input
                            v-model="lookBasicDataFrom.userName"
                            placeholder=""
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        prop="idCard"
                        label="年度："
                    >
                        <el-input
                            v-model="lookBasicDataFrom.idCard"
                            type="number"
                            placeholder=""
                        >
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item
                    prop="userNumber"
                    label="有效日期："
                >
                    <el-date-picker
                        v-model="value1"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item
                    prop="userNumber"
                    label="主题："
                >
                    <el-input
                        v-model="lookBasicDataFrom.idCard"
                        placeholder=""
                    >
                    </el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item
                    prop="userNumber"
                    label="简介："
                >
                    <el-input
                        v-model="lookBasicDataFrom.idCard"
                        placeholder=""
                    >
                    </el-input>
                </el-form-item>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item
                        prop="userNumber"
                        label="简介："
                    >
                        <el-select
                            v-model="value"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item
                        label-width="200px"
                        prop="userNumber"
                        label="本计划最多可投递岗位数："
                    >
                        <el-input
                            v-model="lookBasicDataFrom.idCard"
                            type="number"
                            placeholder=""
                        >
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                {{lookBasicDataFrom.content}}
            </el-row>
            <el-row>
                <el-form-item
                    prop="userNumber"
                    label="招聘内容简介："
                >
                    <vue-ueditor-wrap
                        name="news_content"
                        v-model="lookBasicDataFrom.content"
                        :config="myConfig"
                    ></vue-ueditor-wrap>
                </el-form-item>
            </el-row>
            <el-row>
                <el-form-item
                    prop="userNumber"
                    label="附件上传"
                >
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple
                        :limit="3"
                        :on-exceed="handleExceed"
                        :file-list="fileList"
                    >
                        <el-button
                            size="small"
                            type="primary"
                        >选择文档</el-button>
                    </el-upload>
                </el-form-item>
            </el-row>
            <div class="tableHeader">
                <div class="tableHeader-form"></div>
                <div class="tableHeader-btn">
                    <div
                        class="tableHeader-btn-li"
                        @click="handleEvent('add')"
                    ><i class="el-icon-circle-plus"></i>添加岗位</div>
                    <div
                        class="tableHeader-btn-li tableHeader-btn-red"
                        @click="handleEvent('del')"
                    ><i class="el-icon-delete"></i>删除</div>
                </div>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%"
                border
            >
                <el-table-column
                    type="selection"
                    width="55"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="岗位编码"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="岗位名称"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="岗位需求名称"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="用人部门"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="招聘人数"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-input v-model="value"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="可调剂"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-select
                            v-model="value"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="是否允许绿色通道投递"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-select
                            v-model="value"
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="提示模板"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="联系人"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-input v-model="value"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="联系电话"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-input v-model="value"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            @click="handleEvent('edit')"
                        >修改</el-button>
                        <el-button
                            type="text"
                            @click="handleEvent('view')"
                        >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <addPosition
            v-model="positionShow"
            v-if="positionShow"
        />
        <edit
            v-model="lookInfo"
            :modelType="modelType"
            v-if="lookInfo"
        />
    </base-dialog>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";
const addPosition = () => import("./addPosition");
const edit = () => import("@/components/recruit/jobRequirements/edit");
import { toolbars } from "@/utils/editor_config";

export default {
    components: {
        VueUeditorWrap,
        addPosition,
        edit
    },
    props: {
        showPlan: {
            type: Boolean
        }
    },
    model: {
        prop: "showPlan",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    created() {
        this.isShow = this.showPlan;
    },
    data() {
        return {
            isShow: false,
            rules: {},
            positionShow: false,
            value1: "",
            value: "",
            modelType: "edit",
            lookInfo: false,
            fileList: [],
            tableData: new Array(8).fill({
                date: "2016-05-02",
                name: "王小虎",
                address: "上海"
            }),
            options: [
                {
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                },
                {
                    value: "选项3",
                    label: "蚵仔煎"
                },
                {
                    value: "选项4",
                    label: "龙须面"
                },
                {
                    value: "选项5",
                    label: "北京烤鸭"
                }
            ],
            myConfig: {
                // 编辑器不自动被内容撑高
                UEDITOR_HOME_URL: '/static/UEditor/',
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
            lookBasicDataFrom: {
                content: ""
            }
        };
    },
    methods: {
        handleExceed() { },
        handleEvent(type) {
            switch (type) {
                case "add":
                    this.positionShow = true;
                    break;
                case "edit":
                    this.lookInfo = true;
                    this.modelType = type;
                    break;
                case "view":
                    this.lookInfo = true;
                    this.modelType = type;
            }
        }
    }
};
</script>

<style lang="scss" >
</style>