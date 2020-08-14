<template>
    <!-- 删除提示 -->
    <div v-if="isShow">
        <base-dialog
            :visible.sync="isShow"
            width="450px"
            id="DeleteBox"
            class="deleteBox"
        >
            <div slot="title"><i
                    v-if="text.titleIcon"
                    class="iconfont iconwarn"
                ></i>{{text.title}}</div>
            <div
                class="deleteBox-content"
                v-if="text.list"
            >
                <ul>
                    <li
                        v-for="(item,index) in text.list"
                        :key="index"
                    >
                        <i class="iconfont icon-zhongkuohaozuo"></i>
                        <span>{{item}}</span>
                        <i class="iconfont icon-zhongkuohaoyou"></i>
                    </li>
                </ul>
                <p class="Tips">{{text.msg}}</p>
            </div>
            <div
                class="main-content"
                v-else
            >
                <i
                    v-if="text.bodyIcon"
                    class="iconfont iconwarn"
                ></i><span>{{text.msg}}</span>
            </div>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button
                    class="footer-cancel"
                    size="medium"
                    type="warning"
                    @click="close"
                >{{text.btn.no}}</el-button>
                <el-button
                    size="medium"
                    :type="text.btnColor"
                    @click="ok"
                    :disabled="text.disabled"
                >{{text.btn.ok}}</el-button>
            </span>
        </base-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShow: true,
            text: {
                title: "删除",
                msg: "将被删除，删除后数据不可恢复！请确认是否删除？",
                bodyIcon: true,
                btn: {
                    ok: "确 定",
                    no: "取 消"
                },
                disabled: false,
                btnColor: "primary",
                // list: ["el-dialog", "账号2", "账号3", "账号4"],
                beforeClose: null
            },
            stateList: [
                {
                    type: "delete",
                    title: "删除",
                    titleIcon: true,
                    msg: "将被删除，删除后数据不可恢复！请确认是否删除？",
                    btn: {
                        ok: "完 成",
                        no: "取 消"
                    },
                    disabled: false,
                    list: ["el-dialog", "账号2", "账号3", "账号4"],
                    btnColor: "danger",
                    beforeClose: null
                },
                {
                    type: "delMes",
                    title: "删除",
                    titleIcon: true,
                    msg: "确认删除成员？",
                    btn: {
                        ok: "完 成",
                        no: "取 消"
                    },
                    disabled: false,
                    btnColor: "danger",
                    beforeClose: null
                },
                {
                    type: "enable",
                    title: "提示",
                    titleIcon: false,
                    msg: "选中数据将被启用，其他相关业务功能能正常调用！",
                    bodyIcon: true,
                    disabled: false,
                    btnColor: "primary",
                    btn: {
                        ok: "确 定",
                        no: "取 消"
                    },
                    beforeClose: null
                },
                {
                    type: "disable",
                    title: "提示",
                    titleIcon: false,
                    bodyIcon: true,
                    disabled: false,
                    btnColor: "primary",
                    msg:
                        "选中数据将被禁用，其他相关业务功能不能调用。 已被调用数据则正常显示！",
                    btn: {
                        ok: "确 定",
                        no: "取 消"
                    },
                    beforeClose: null
                }
            ]
        };
    },
    methods: {
        close() { },
        ok() { }
    }
};
</script>

<style lang="scss">
// 删除
#DeleteBox {
    .iconwarn {
        font-size: 18px;
        color: #ef5454;
        margin-right: 5px;
    }
    .deleteBox-content {
        padding: 0 4px;
        border-radius: 4px;
        ul {
            padding: 5px 12px;
            margin-bottom: 15px;
            border: 1px solid rgba(229, 229, 229, 1);
            li {
                line-height: 20px;
                color: #ef5454;
                font-size: 14px;
            }
        }
        .Tips {
            font-size: 14px;
            color: rgba(31, 30, 52, 1);
        }
    }
    .main-content {
        font-size: 14px;
        padding: 10px 30px;
        display: flex;
        justify-content: center;
        line-height: 27px;
        .iconwarn {
            color: #e8b135;
        }
    }
    .el-dialog__header {
        background-color: rgba(248, 249, 252, 1);
    }
    .el-dialog__footer {
        display: flex;
        align-content: center;
        justify-content: center;
    }
    .footer-cancel {
        margin-right: 50px;
    }
}
</style>