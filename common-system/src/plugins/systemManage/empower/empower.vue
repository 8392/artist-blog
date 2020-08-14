<template>
    <div class="empower common-pagination1">
        <common-title
            titleBig="系统管理"
            titleSmall="数据权限"
        ></common-title>
        <!--搜索栏-->
        <div class="typeList">
            <el-form
                :inline="true"
                :model="page.searchform"
                class="demo-form-inline"
            >
                <el-form-item label="账号:">
                    <el-input v-model="page.searchform.account"></el-input>
                </el-form-item>
                <el-form-item
                    label="姓名:"
                    label-width="80px"
                >
                    <el-input v-model="page.searchform.name"></el-input>
                </el-form-item>
                <el-form-item
                    label="部门:"
                    label-width="80px"
                >
                    <el-select
                        v-model="page.searchform.dep"
                        placeholder="活动区域"
                    >
                        <el-option
                            label="教务处"
                            value="jiaowu"
                        ></el-option>
                        <el-option
                            label="人事处"
                            value="renshi"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        @click="onSubmit"
                    >搜索</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!--表头-->
        <div class="tableBox">
            <el-table
                :data="userTable"
                stripe
                tooltip-effect="dark"
                style="width: 100%"
            >
                <!--<el-table-column type="selection" width="55"> </el-table-column>!-->
                <el-table-column width="55"> </el-table-column>
                <el-table-column
                    prop="account"
                    label="账号"
                > </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                > </el-table-column>
                <el-table-column
                    prop="OperatorNbm"
                    label="操作者账号"
                >
                </el-table-column>
                <el-table-column
                    prop="OperatorName"
                    label="操作者姓名"
                >
                </el-table-column>
                <el-table-column
                    prop="dep"
                    label="部门"
                > </el-table-column>
                <el-table-column
                    prop="time"
                    label="登录时间"
                    show-overflow-tooltip
                    width="240"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="160"
                >look
                    <template slot-scope="scope">
                        <el-button
                            @click="look(scope.$index, scope.row)"
                            type="text"
                        >查看</el-button>
                        <el-button
                            @click="empower(scope.$index, scope.row)"
                            type="text"
                        >授权</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--分页-->
        <div class="pagination">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
            >
            </el-pagination>
        </div>

        <!-- 查看简历信息-->
        <el-dialog
            title="数据权限详情"
            :visible.sync="lookDialog"
            width="1320px"
        >
            <div class="lookResume">
                <el-tabs
                    v-model="activeName"
                    type="card"
                    @tab-click="handleClick"
                >
                    <el-tab-pane
                        label="当前数据权限列表"
                        name="first"
                    >
                        <h4 class="lookResume-title">
                            <span>账号：</span>
                            <span class="name">admin</span>
                            <span>实名：</span>
                            <span class="name">admin123</span>
                        </h4>
                        <div class=" treeContent">
                            <ul class="treeContent-title">
                                <li class="treeContent-check"></li>
                                <li class="treeContent-tD">招聘计划</li>
                                <li class="treeContent-check">
                                    <el-checkbox disabled></el-checkbox>
                                </li>
                                <li class="treeContent-tD">部门</li>
                                <li class="treeContent-check">
                                    <el-checkbox disabled></el-checkbox>
                                </li>
                                <li class="treeContent-tD">岗位</li>

                                <li class="treeContent-type">应聘者信息</li>
                                <li class="treeContent-type">简历库</li>
                                <li class="treeContent-type">人才选拔 </li>

                            </ul>
                            <el-tree
                                class="tableTree"
                                :data="currentLookOrganizationData"
                                ref="currentLookOrganizationData"
                                show-checkbox
                                default-expand-all
                                node-key="id"
                                :default-checked-keys='current_keys'
                                :expand-on-click-node='false'
                                :props="defaultProps"
                            >
                            </el-tree>
                        </div>
                    </el-tab-pane>

                    <el-tab-pane
                        v-model="activeName"
                        label="历史数据授权列表"
                        name="second"
                    >
                        <h4 class="lookResume-title">历史数据授权列表</h4>
                        <div class=" treeContent">
                            <ul class="treeContent-title">
                                <li class="treeContent-check">
                                    <el-checkbox disabled></el-checkbox>
                                </li>
                                <li class="treeContent-tD">招聘计划</li>

                                <li class="treeContent-check">
                                    <el-checkbox disabled></el-checkbox>
                                </li>
                                <li class="treeContent-tD">部门</li>

                                <li class="treeContent-check">
                                    <el-checkbox disabled></el-checkbox>
                                </li>
                                <li class="treeContent-tD">岗位</li>

                                <li class="treeContent-type">应聘者信息</li>
                                <li class="treeContent-type">简历库</li>
                                <li class="treeContent-type">人才选拔</li>
                            </ul>
                            <el-tree
                                v-if="activeName=='second'"
                                class="tableTree"
                                :data="oldOrganizationData"
                                ref="oldOrganizationData"
                                show-checkbox
                                default-expand-all
                                node-key="id"
                                :default-checked-keys='old_keys'
                                :expand-on-click-node='false'
                                :props="defaultProps"
                            >
                            </el-tree>
                        </div>
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
                    @click="lookDialog = false"
                >关闭</el-button>
            </span>

        </el-dialog>

        <!-- 授权简历信息-->
        <el-dialog
            title="数据权限详情"
            :visible.sync="empowerDialog"
            width="1320px"
        >
            <div class="lookResume">
                <div class=" treeContent">
                    <ul class="treeContent-title">
                        <li class="treeContent-check"></li>
                        <li class="treeContent-tD">招聘计划</li>
                        <li class="treeContent-check">
                            <el-checkbox disabled></el-checkbox>
                        </li>
                        <li class="treeContent-tD">部门</li>
                        <li class="treeContent-check">
                            <el-checkbox disabled></el-checkbox>
                        </li>
                        <li class="treeContent-tD">岗位</li>
                        <li class="treeContent-type">应聘者信息</li>
                        <li class="treeContent-type">简历库</li>
                        <li class="treeContent-type">人才选拔</li>
                    </ul>
                    <el-tree
                        class="tableTree"
                        :data="currentPowerOrganizationData"
                        ref="currentPowerOrganizationData"
                        show-checkbox
                        default-expand-all
                        :default-checked-keys='current_keys'
                        node-key="id"
                        :expand-on-click-node='false'
                        :props="defaultProps"
                    >
                    </el-tree>
                </div>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    size="medium"
                    type="primary"
                    @click="power"
                >授权</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "empower",
    data() {
        return {
            page: {
                // 当前页数
                currentPage: 1,
                // 每页数量
                pageSize: 15,
                // 总页数
                totalCounts: 0,
                // 总条数
                total: -1,
                //搜索条件
                searchform: {
                    account: '',
                    name: '',
                    dep: '',
                }
            },
            //      rules: {
            //         name:[{
            //             required: true,
            //             message: '2222',
            //             trigger: 'blur'
            //         }],
            //         account:[{
            //             min: 2,
            //             max: 30,
            //             message: '职位的长度范围2~30个字符',
            //             trigger: 'blur'
            //         }]
            // },

            // 用户管理表格
            userTable: [{
                account: 20040123,
                name: "张三",
                OperatorNbm: "1234567",
                OperatorName: "admin",
                dep: "人事部",
                time: "2018-08-01 10：10：27：00"
            },
            {
                account: 20040123,
                name: "张三",
                OperatorNbm: "1234567",
                OperatorName: "admin",
                dep: "人事部",
                time: "2018-08-01 10：10：27：00"
            },
            {
                account: 20040123,
                name: "张三",
                OperatorNbm: "1234567",
                OperatorName: "admin",
                dep: "人事部",
                time: "2018-08-01 10：10：27：00"
            }
            ],
            // 分页器当前页
            currentPage4: 4,

            empowerDialog: false,
            lookDialog: false,

            // 标签页 默认first
            activeName: "first",
            checkAll: false,
            //当前数据授权列表数据 被授权的步骤id
            current_keys: [1112, 2],
            //历史数据授权列表数据 被授权的步骤id
            old_keys: [1112, 1111, 1123, 1122],
            //当前可授权数据授权列表数据
            currentPowerOrganizationData: [{
                id: 7777777,
                label: '',
                name: '全选',
                disabled: false,
                children: [{
                    id: 1,
                    label: '招聘计划34',
                    children: [{
                        id: 11,
                        label: '法学院',
                        children: [{
                            id: 111,
                            label: '行政管理',

                            children: [{
                                id: 1111,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1112,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1113,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 112,
                            label: '资产管理',
                            children: [{
                                id: 1121,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1122,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1123,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 113,
                            label: '宣传管理',
                            children: [{
                                id: 1131,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1132,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1133,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    {
                        id: 12,
                        label: '行政学院',
                        children: [{
                            id: 121,
                            label: '行政管理',

                            children: [{
                                id: 1211,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1212,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1213,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 122,
                            label: '资产管理',
                            children: [{
                                id: 1221,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1222,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1223,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 123,
                            label: '宣传管理',
                            children: [{
                                id: 1231,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1232,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1233,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    {
                        id: 13,
                        label: '商学院',
                        children: [{
                            id: 131,
                            label: '行政管理',

                            children: [{
                                id: 1311,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1312,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1313,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 132,
                            label: '资产管理',
                            children: [{
                                id: 1321,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1322,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1323,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 133,
                            label: '宣传管理',
                            children: [{
                                id: 1331,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1332,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1333,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    ]
                },
                {
                    id: 2,
                    label: '管理计划',
                    children: [{
                        id: 21,
                        label: '法学院',
                        children: [{
                            id: 211,
                            label: '行政管理',

                            children: [{
                                id: 2111,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2112,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2113,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 212,
                            label: '资产管理',
                            children: [{
                                id: 2121,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2122,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2123,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 213,
                            label: '宣传管理',
                            children: [{
                                id: 2131,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2132,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2133,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    {
                        id: 22,
                        label: '行政学院',
                        children: [{
                            id: 221,
                            label: '行政管理',

                            children: [{
                                id: 2211,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2212,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2213,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 222,
                            label: '资产管理',
                            children: [{
                                id: 2221,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2222,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2223,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 223,
                            label: '宣传管理',
                            children: [{
                                id: 2231,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2232,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2233,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    {
                        id: 23,
                        label: '商学院',
                        children: [{
                            id: 231,
                            label: '行政管理',

                            children: [{
                                id: 2311,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2312,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2313,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 232,
                            label: '资产管理',
                            children: [{
                                id: 2321,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2322,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2323,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 233,
                            label: '宣传管理',
                            children: [{
                                id: 2331,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2332,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2333,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    ]
                },

                ]
            }],
            //当前可查看数据授权列表数据
            currentLookOrganizationData: [{
                id: 7777777,
                label: '',
                name: '全选',
                disabled: true,
                children: [{
                    id: 1,
                    label: '招聘计划34',
                    children: [{
                        id: 11,
                        label: '法学院',
                        children: [{
                            id: 111,
                            label: '行政管理',

                            children: [{
                                id: 1111,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1112,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1113,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 112,
                            label: '资产管理',
                            children: [{
                                id: 1121,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1122,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1123,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 113,
                            label: '宣传管理',
                            children: [{
                                id: 1131,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1132,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1133,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    {
                        id: 12,
                        label: '行政学院',
                        children: [{
                            id: 121,
                            label: '行政管理',

                            children: [{
                                id: 1211,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1212,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1213,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 122,
                            label: '资产管理',
                            children: [{
                                id: 1221,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1222,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1223,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 123,
                            label: '宣传管理',
                            children: [{
                                id: 1231,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1232,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1233,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    {
                        id: 13,
                        label: '商学院',
                        children: [{
                            id: 131,
                            label: '行政管理',

                            children: [{
                                id: 1311,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1312,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1313,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 132,
                            label: '资产管理',
                            children: [{
                                id: 1321,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1322,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1323,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 133,
                            label: '宣传管理',
                            children: [{
                                id: 1331,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1332,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1333,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    ]
                },
                {
                    id: 2,
                    label: '管理计划',
                    children: [{
                        id: 21,
                        label: '法学院',
                        children: [{
                            id: 211,
                            label: '行政管理',

                            children: [{
                                id: 2111,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2112,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2113,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 212,
                            label: '资产管理',
                            children: [{
                                id: 2121,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2122,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2123,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 213,
                            label: '宣传管理',
                            children: [{
                                id: 2131,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2132,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2133,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    {
                        id: 22,
                        label: '行政学院',
                        children: [{
                            id: 221,
                            label: '行政管理',

                            children: [{
                                id: 2211,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2212,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2213,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 222,
                            label: '资产管理',
                            children: [{
                                id: 2221,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2222,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2223,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 223,
                            label: '宣传管理',
                            children: [{
                                id: 2231,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2232,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2233,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    {
                        id: 23,
                        label: '商学院',
                        children: [{
                            id: 231,
                            label: '行政管理',

                            children: [{
                                id: 2311,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2312,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2313,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 232,
                            label: '资产管理',
                            children: [{
                                id: 2321,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2322,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2323,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 233,
                            label: '宣传管理',
                            children: [{
                                id: 2331,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2332,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2333,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    ]
                },

                ]
            }],
            //历史数据授权列表数据
            oldOrganizationData: [{
                id: 7777777,
                label: '',
                name: '全选',
                disabled: true,
                children: [{
                    id: 1,
                    label: '招聘计划34',
                    children: [{
                        id: 11,
                        label: '法学院',
                        children: [{
                            id: 111,
                            label: '行政管理',

                            children: [{
                                id: 1111,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1112,
                                disabled: true,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1113,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 112,
                            label: '资产管理',
                            children: [{
                                id: 1121,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1122,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1123,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 113,
                            label: '宣传管理',
                            children: [{
                                id: 1131,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1132,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1133,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    {
                        id: 12,
                        label: '行政学院',
                        children: [{
                            id: 121,
                            label: '行政管理',

                            children: [{
                                id: 1211,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1212,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1213,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 122,
                            label: '资产管理',
                            children: [{
                                id: 1221,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1222,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1223,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 123,
                            label: '宣传管理',
                            children: [{
                                id: 1231,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1232,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1233,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    {
                        id: 13,
                        label: '商学院',
                        children: [{
                            id: 131,
                            label: '行政管理',

                            children: [{
                                id: 1311,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1312,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1313,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 132,
                            label: '资产管理',
                            children: [{
                                id: 1321,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1322,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1323,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 133,
                            label: '宣传管理',
                            children: [{
                                id: 1331,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 1332,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 1333,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    ]
                },
                {
                    id: 2,
                    label: '管理计划',
                    children: [{
                        id: 21,
                        label: '法学院',
                        children: [{
                            id: 211,
                            label: '行政管理',

                            children: [{
                                id: 2111,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2112,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2113,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 212,
                            label: '资产管理',
                            children: [{
                                id: 2121,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2122,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2123,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 213,
                            label: '宣传管理',
                            children: [{
                                id: 2131,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2132,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2133,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    {
                        id: 22,
                        label: '行政学院',
                        children: [{
                            id: 221,
                            label: '行政管理',

                            children: [{
                                id: 2211,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2212,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2213,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 222,
                            label: '资产管理',
                            children: [{
                                id: 2221,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2222,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2223,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 223,
                            label: '宣传管理',
                            children: [{
                                id: 2231,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2232,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2233,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    {
                        id: 23,
                        label: '商学院',
                        children: [{
                            id: 231,
                            label: '行政管理',

                            children: [{
                                id: 2311,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2312,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2313,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 232,
                            label: '资产管理',
                            children: [{
                                id: 2321,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2322,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2323,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        {
                            id: 233,
                            label: '宣传管理',
                            children: [{
                                id: 2331,
                                label: '',
                                name: "应聘者信息"
                            },
                            {
                                id: 2332,
                                label: '',
                                name: '简历库'
                            },
                            {
                                id: 2333,
                                label: '',
                                name: '人才选拔'
                            },
                            ]
                        },
                        ]
                    },
                    ]
                },

                ]
            }],

            // children和label 与接口字段保持一致
            defaultProps: {
                children: 'children',
                label: 'label'
            },
        }

    },
    components: {},
    created() { },
    mounted() { },
    watch: {
        lookDialog: function (newVal, oldVal) {
            if (newVal == false) {
                this.activeName = 'first';
            }
        },
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        onSubmit() {
            console.log("submit!");
        },
        look(index, row) {
            this.lookDialog = true;
            this.handleClick();
        },
        empower(index, row) {
            //console.log(index, row);
            this.empowerDialog = true;
        },
        // 查看
        handleClick(tab, event) {
            this.disabled();
        },
        //授权
        power() {
            let res = this.$refs.currentPowerOrganizationData.getCheckedKeys();
            console.log(res);
            this.empowerDialog = false;
        },

        //设置disabled
        disabled() {
            let organizationData = this.currentLookOrganizationData;
            if (this.activeName == "second") {
                organizationData = this.oldOrganizationData;
            }
            this.getMenu(organizationData);
        },
        //遍历设置disabled授权数据
        getMenu(organizationData) {
            let that = this;
            organizationData.map(function (dom) {
                dom.disabled = true;
                if (dom.children && dom.children.length > 0) {
                    that.getMenu(dom.children);
                }
            });
        },
        //获取用户列表
        getUserList() { },
        //获取用户的当前授权收据
        getCurrentData() { },
        //获取用户的历史授权数据
        getOldData() { },
        //获取活动部门
        getdep() { },


    }
};
</script>

<style lang="scss" scoped>
.empower {
    .typeList {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-bottom: 15px;
        padding-top: 15px;
    }

    .tableBox {
        margin-bottom: 30px;
    }

    .lookResume-title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
        font-weight: bold;
        color: rgba(31, 30, 52, 1);
        padding-bottom: 15px;

        .name {
            padding: 0 85px 0 20px;
        }
    }

    .table {
        border-collapse: collapse;
        border: 1px solid #ebeef5;
        width: 100%;
        text-align: left;

        // text-align: center;
        tr {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            word-break: break-all;
            line-height: 23px;
            padding-left: 10px;
            padding-right: 10px;

            &:nth-of-type(2n) {
                td:nth-last-of-type(5),
                td:nth-last-of-type(4),
                td:nth-last-of-type(3),
                td:nth-last-of-type(2),
                td:nth-last-of-type(1) {
                    background: #fafafa;
                }
            }

            td,
            th {
                padding: 12px 0 12px 10px;
                border: 1px solid #ebeef5;
            }
        }
    }

    .treeContent {
        position: relative;

        .treeContent-title {
            height: 50px;
            line-height: 50px;
            display: flex;
            justify-content: flex-start;
            align-content: center;
            border: 1px solid rgba(229, 229, 229, 1);
            border: 1px solid red;
            border-bottom: none;

            li {
                border-right: 1px rgba(229, 229, 229, 1) solid;
                text-align: center;

                &:last-of-type {
                    border-right: none;
                }
            }

            .treeContent-check {
                width: 50px;
            }

            .treeContent-tD {
                width: 200px;
            }

            .treeContent-type {
                flex: 1;
            }
        }
    }
}
</style>
