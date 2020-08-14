<template>
    <div>
        <div class="uploadC">
            <input
                type="file"
                @change="Preview($event)"
                ref="showinput"
            >
            <el-button
                v-if="isBtn"
                class="selectfile"
                slot="trigger"
                size="small"
                type="primary"
            >{{title}}</el-button>
            <span v-else>{{title}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "选择图片"
        },
        isBtn: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {}
    },
    methods: {
        Preview(ev) {
            let fileName = ev.target.files[0].name;
            const nameL = fileName.slice(fileName.lastIndexOf(".") + 1)
            this.$emit("upload", ev.target.files[0], nameL)
        }
    }
}
</script>

<style lang="scss" scoped>
.uploadC {
    position: relative;
    input {
        display: block;
        cursor: pointer;
        width: 80px;
        height: 38px;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
    }
}
</style>