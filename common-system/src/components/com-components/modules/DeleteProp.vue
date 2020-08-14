<template>
    <!-- 删除提示 -->
    <base-dialog
        :visible.sync="isShow"
        width="450px"
        @close="close"
        class="deleteBox"
    >
        <div slot="title"><i class="iconfont iconwarn"></i>删除</div>
        <div class="deleteBox-content">
            <ul>
                <li
                    v-for="(item,index) in userList"
                    :key="index"
                >
                    <i class="iconfont icon-zhongkuohaozuo"></i>
                    {{item}}
                    <i class="iconfont icon-zhongkuohaoyou"></i>
                </li>
            </ul>
            <p class="Tips">将被删除，删除后数据不可恢复！请确认是否删除？</p>
        </div>
        <span
            slot="footer"
            class="dialog-footer"
        >
            <el-button
                size="medium"
                type="warning"
                @click="isShow = false"
            >取 消</el-button>
            <el-button
                size="medium"
                type="danger"
                @click="sureDelete"
            >确定</el-button>
        </span>
    </base-dialog>
</template>

<script>
export default {
    props: {
        deleteDialog: {
            type: Boolean
        }
    },
    model: {
        prop: "deleteDialog",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    created() {
        this.isShow = this.deleteDialog;
    },
    data() {
        return {
            isShow: false,
            userList: ["el-dialog", "账号2", "账号3", "账号4"]
        };
    },
    methods: {
        close() {
            this.isShow = false;
        },
        sureDelete() {
            this.$emit("sureDelete");
        }
    }
};
</script>

<style lang="scss" scoped>
// 删除
.deleteBox {
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
}
</style>