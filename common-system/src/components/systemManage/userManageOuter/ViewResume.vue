<template>
    <base-dialog
        title="应聘者简历"
        :visible.sync="isShow"
        width="900px"
    >
        <div class="lookResume viewPage">
            <el-tabs
                v-model="activeName"
                type="card"
                @tab-click="handleClick"
            >
                <el-tab-pane
                    v-for="(item, index) in resumeData"
                    :key="index"
                    :label="item.title"
                    :name="String(index)"
                >
                    <h4 class="lookResume-title">个人简历信息1</h4>
                    <ul>
                        <li>
                            <h4 class="lookResume-titleList"><i class="iconfont iconlingxing"></i>基本信息</h4>
                        </li>
                        <li>
                            <el-form label-width="85px">
                                <el-row>
                                    <el-col :span="8">
                                        <el-form-item label="姓名：">
                                            <el-input
                                                v-model="item.data.name"
                                                placeholder=""
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="曾用名：">
                                            <el-input
                                                v-model="item.data.name"
                                                placeholder=""
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="民族：">
                                            <el-select
                                                v-model="item.data.nation"
                                                style="width:100%"
                                            >
                                                <el-option
                                                    label="汉族"
                                                    value="hanzu"
                                                ></el-option>
                                                <el-option
                                                    label="回族"
                                                    value="huizu"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="性别：">
                                            <el-input
                                                v-model="item.data.gender"
                                                placeholder=""
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="出生年月：">
                                            <el-input
                                                v-model="item.data.birthday"
                                                placeholder=""
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="8">
                                        <el-form-item label="户籍地：">
                                            <el-input
                                                v-model="item.data.address"
                                                placeholder=""
                                            ></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>

                        </li>
                        <!-- <li>
                            <h4 class="lookResume-titleList"><i class="iconfont iconlingxing"></i>学校信息</h4>
                        </li>
                        <li class="table-b">
                            <el-table
                                :data="lookResumeFrom.resumeData"
                                stripe
                                border
                                style="width: 100%"
                            >
                                <el-table-column
                                    prop="dateTime"
                                    label="起止时间"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="college"
                                    label="学院"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="major"
                                    label="所学专业"
                                >
                                </el-table-column>
                            </el-table>
                        </li>
                        <li>
                            <h4 class="lookResume-titleList"><i class="iconfont iconlingxing"></i>工作经历</h4>
                        </li>
                        <li class="table-b">
                            <el-table
                                :data="lookResumeFrom.workHistory"
                                stripe
                                border
                                style="width: 100%"
                            >
                                <el-table-column
                                    prop="dateTime"
                                    label="起止时间"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="company"
                                    label="工作单位"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="job"
                                    label="担任职务"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="level"
                                    label="级别"
                                >
                                </el-table-column>
                            </el-table>
                        </li> -->
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </div>
        <span
            slot="footer"
            class="dialog-footer"
        >
            <el-button
                size="medium"
                type="primary"
                @click="isShow = false"
            >返回</el-button>
        </span>
    </base-dialog>
</template>

<script>
import { getResume } from "@/api/systemManage/userManageOuter";

export default {
    name: "ViewResume",
    props: {
        lookResume: {
            type: Boolean
        },
        account_id: {
            type: [String, Number]
        }
    },
    model: {
        prop: "lookResume",
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
            activeName: "0",
            resumeData: [], //简历数据
        };
    },
    created() {
        this.isShow = this.lookResume;
        this.getResumeApi();
    },
    methods: {
        // 个人简历选项卡
        handleClick(tab, event) {
        },
        async getResumeApi() { //获取简历接口
            const res = await getResume({
                accountId: this.account_id
            })
            let arr = [];
            res.forEach((curr, index) => {
                arr.push({
                    resume_id: curr.resume_id,
                    title: `简历${index + 1}`,
                    data: JSON.parse(curr.resume_information)
                })
            })
            this.resumeData = arr;
        }
    }
};
</script>

<style lang="scss" scoped>
// 简历信息
.lookResume {
    .lookResume-title {
        line-height: 36px;
        text-align: center;
        background: rgba(234, 237, 245, 1);
        border-radius: 4px;
        font-size: 14px;
        font-weight: bold;
        color: rgba(69, 67, 111, 1);
        margin-bottom: 15px;
    }
    .lookResume-titleList {
        height: 28px;
        font-size: 14px;
        font-weight: bold;
        color: rgba(69, 67, 111, 1);
        .iconlingxing {
            font-size: 6px;
            margin-right: 8px;
        }
    }
    .table-b {
        margin-bottom: 20px;
    }
}
</style>