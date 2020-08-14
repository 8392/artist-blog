<template>
    <base-dialog
        :title="config.title"
        :visible.sync="isShow"
        width="750px"
    >
        <div
            class="lookInfo"
            :class="config.id == 1 ? 'viewPage' : ''"
        >
            <el-form
                :model="queryData"
                label-width="100px"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户账号：">
                            <el-input
                                :disabled="config.id == 2"
                                v-model="queryData.account"
                                placeholder=""
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="别名：">
                            <el-input
                                v-model="queryData.alias"
                                placeholder=""
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="姓名：">
                            <el-input
                                :disabled="config.id == 2"
                                v-model="queryData.name"
                                placeholder=""
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别：">
                            <el-select
                                v-model="queryData.sex"
                                style="width:100%"
                            >
                                <el-option
                                    v-for="(item,index) in options.list7"
                                    :key="index"
                                    :label="item.lookup_name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="政治面貌：">
                            <el-select
                                v-model="queryData.political_orientation"
                                style="width:100%"
                            >
                                <el-option
                                    v-for="(item,index) in options.list4"
                                    :key="index"
                                    :label="item.lookup_name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="年龄：">
                            <el-input
                                v-model="queryData.age"
                                placeholder=""
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="民族：">
                            <el-select
                                v-model="queryData.nation"
                                style="width:100%"
                            >
                                <el-option
                                    v-for="(item, index) in options.list3"
                                    :key="index"
                                    :label="item.lookup_name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="学历：">
                            <el-select
                                v-model="queryData.education"
                                style="width:100%"
                            >
                                <el-option
                                    v-for="(item, index) in options.list1"
                                    :key="index"
                                    :label="item.lookup_name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="专业方向：">
                            <el-select
                                v-model="queryData.speciality"
                                style="width:100%"
                            >
                                <el-option
                                    v-for="(item, index) in options.list5"
                                    :key="index"
                                    :label="item.lookup_name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="毕业学校：">
                            <!-- <el-select
                                v-model="queryData.graduation_school"
                                style="width:100%"
                            >
                                <el-option
                                    v-for="(item, index) in options.list2"
                                    :key="index"
                                    :label="item.lookup_name"
                                    :value="item.id"
                                ></el-option>
                            </el-select> -->
                            <el-input
                                v-model="queryData.graduation_school"
                                placeholder=""
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="学科">
                            <el-select
                                v-model="queryData.subject"
                                style="width:100%"
                            >
                                <el-option
                                    v-for="(item, index) in options.list6"
                                    :key="index"
                                    :label="item.lookup_name"
                                    :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="证件类型：">
                            <el-select
                                :disabled="config.id == 2"
                                v-model="queryData.papers_type"
                                style="width:100%"
                            >
                                <el-option
                                    v-for="(item, index) in options.list8"
                                    :key="index"
                                    :label="item.paperName"
                                    :value="item.paperId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="证件号码：">
                            <el-input
                                :disabled="config.id == 2"
                                v-model="queryData.papers_number"
                                placeholder=""
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机号：">
                            <el-input
                                :disabled="config.id == 2"
                                v-model="queryData.phone"
                                placeholder=""
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱：">
                            <el-input
                                :disabled="config.id == 2"
                                v-model="queryData.email"
                                placeholder=""
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <span
            slot="footer"
            class="dialog-footer"
        >
            <el-button
                v-if="config.id == 1"
                size="medium"
                type="primary"
                @click="isShow = false"
            >返回</el-button>
            <el-button
                v-else
                size="medium"
                type="primary"
                @click="sureMeth"
            >完成</el-button>
        </span>
    </base-dialog>
</template>

<script>
import { getDetail, updateOutSchoolUser } from "@/api/systemManage/userManageOuter";
import { getEducation, getGraduationSchool, getNation, getPoliticalOrientation, getSpeciality, getSubject, getSex, getPaperTypes } from "@/api/common";
const config = {
    view: {
        id: 1,
        title: "查看",
    },
    edit: {
        id: 2,
        title: "修改",
    }
}

export default {
    props: {
        lookInfo: {
            type: Boolean
        },
        account_id: {
            type: [String, Number]
        },
        pageType: {
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
    data() {
        return {
            isShow: false,
            config: {},
            // 查看并修改个人信息
            queryData: {
                account: "",//用户账号
                email: "",//邮箱
                name: "",//用户姓名
                papers_number: "",//证件号
                papers_type: "",//证件类别
                password: "",//用户密码
                phone: "",//手机号
                validateCode: "",//验证码
                id: "",//
            },
            options: {
                list1: [],
                list2: [],
                list3: [],
                list4: [],
                list5: [],
                list6: [],
                list7: [],
                list8: [],
            }
        };
    },
    created() {
        this.config = config[this.pageType]
        this.getDetail();
        this.getOptions();
        this.isShow = this.lookInfo;
    },
    methods: {
        async getDetail() { //获取详情接口
            const res = await getDetail({ accountId: this.account_id });
            this.queryData = res;
            console.log("校外详情", res)
        },
        async getOptions() {//下拉接口
            let optionArr = await Promise.all([getEducation(), getGraduationSchool(), getNation(), getPoliticalOrientation(), getSpeciality(), getSubject(), getSex(), getPaperTypes()])
            Object.keys(this.options).forEach((curr, index) => {
                this.options[curr] = optionArr[index]
            })
        },
        async sureMeth() {
            const res = await updateOutSchoolUser(this.queryData);
            this.$message.success("修改成功！")
            this.isShow = false;
            this.$emit("updeteList")
        }
    }
};
</script>

<style lang="scss" scoped>
.view {
    .el-select {
        pointer-events: none;
    }
    .el-input__suffix-inner {
        pointer-events: none !important;
    }
    // /deep/ .el-input__suffix-inner {
    //     pointer-events: none !important;
    // }
    .el-input {
        pointer-events: none;
    }
}
</style>