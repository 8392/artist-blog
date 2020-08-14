<template>
    <base-dialog
        :title="config.title"
        :visible.sync="isShow"
        append-to-body
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
                        label="岗位需求名称："
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
                        label="岗位编码："
                    >
                        <el-input
                            v-model="lookBasicDataFrom.userName"
                            disabled
                            placeholder=""
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item
                        prop="idCard"
                        label="岗位名称："
                    >
                        <el-input
                            v-model="lookBasicDataFrom.idCard"
                            placeholder=""
                        >
                            <i
                                slot="suffix"
                                class="el-input__icon el-icon-search"
                                @click="handleEvent('job')"
                            ></i></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item
                        prop="userNumber"
                        label="联系人："
                    >
                        <el-input
                            v-model="lookBasicDataFrom.userNumber"
                            placeholder=""
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                        prop="userName"
                        label="用人部门："
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
                <el-col :span="6">
                    <el-form-item
                        prop="idCard"
                        label="联系方式："
                    >
                        <el-input
                            v-model="lookBasicDataFrom.idCard"
                            placeholder=""
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                        prop="idCard"
                        label="简历模板："
                    >
                        <el-input
                            v-model="lookBasicDataFrom.idCard"
                            placeholder=""
                        > <i
                                slot="suffix"
                                @click="handleEvent('resume')"
                                class="el-input__icon el-icon-search"
                            ></i></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item
                    prop="idCard"
                    label="需求描述："
                >
                    <el-input
                        v-model="lookBasicDataFrom.idCard"
                        placeholder=""
                    ></el-input>
                </el-form-item>
            </el-row>
            <el-row style="padding-bottom: 20px">岗位招聘要求明细表：</el-row>
            <el-table
                :data="tableData"
                style="width: 100%"
                border
            >
                <el-table-column
                    prop="date"
                    label="编码"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="岗位需求"
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
                    label="描述"
                    align="center"
                >
                    <template slot-scope="scope">
                        <el-input
                            v-model="lookBasicDataFrom.idCard"
                            placeholder=""
                        ></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="条件名称"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="条件规则"
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
                    label="条件值类型"
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
                    label="条件值"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="重要程度"
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
                    label="条件关系"
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
                    label="子表名称"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作"
                    align="center"
                >
                    <template slot-scope="scope">
                        <i class="el-icon-circle-plus plus"></i>
                        <i class="el-icon-remove remove"></i>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <span
            slot="footer"
            class="dialog-footer"
        >
            <el-button
                size="medium"
                type="warning"
                @click="handleEvent('cancel')"
            >取 消</el-button>
            <el-button
                size="medium"
                type="primary"
                @click="handleEvent('save')"
            >保 存</el-button>
        </span>
        <postSelect
            v-model="openSelect"
            v-if="openSelect"
            :selectType="selectType"
        />
    </base-dialog>
</template>

<script>
const postSelect = () => import("./postSelect");

let configLsit = {
    add: {
        id: 1,
        title: "新增岗位需求"
    },
    edit: {
        id: 2,
        title: "编辑岗位需求"
    },
    view: {
        id: 3,
        title: "查看岗位需求"
    }
};
export default {
    components: {
        postSelect
    },
    props: {
        lookInfo: {
            type: Boolean
        },
        modelType: {
            type: String
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
        this.isShow = this.lookInfo;
        this.config = configLsit[this.modelType];
    },
    data() {
        return {
            isShow: false,
            openSelect: false,
            selectType: "job",
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
            value: "",
            tableData: new Array(8).fill({
                date: "2016-05-02",
                name: "王小虎",
                address: "上海"
            }),
            lookBasicDataFrom: {},
            rules: {},
            config: {} //配置信息
        };
    },
    methods: {
        handleEvent(type) {
            // this.isShow = false;
            this.selectType = type;
            this.openSelect = true;
            switch (type) {
                case "jobT":
                    this;
                    break;
                case "resume":
                    break;
            }
        },
        changeData(data) {
            console.log("data", data);
        }
    }
};
</script>

<style lang="scss" scoped>
.basicData {
    .plus {
        font-size: 18px;
        color: #4cb209;
        margin-right: 10px;
        cursor: pointer;
    }
    .remove {
        font-size: 18px;
        color: #ef5454;
        cursor: pointer;
    }
    .el-input__icon {
        font-size: 18px;
        cursor: pointer;
    }
}
</style>