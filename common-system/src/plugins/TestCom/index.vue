<template>
    <div>
        <div>测试线上环境打包</div>
        <div class="img">
            <img :src="img" />
        </div>
        <Test />
    </div>
</template>

<script>
import Test from "./Test";
import img from "@/assets/fj.jpg"
export default {
    components: {
        Test
    },
    props: {

    },
    data() {
        return {
            // img,
            img,
            dialogVisible: false
        }
    }
}
</script>

<style lang="scss" scoped>
.img {
    width: 400px;
    img {
        width: 100%;
    }
}
</style>
