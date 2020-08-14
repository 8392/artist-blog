<template>
    <div :class="$sty.inVindicate">系统维护中！</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {}
    }
}
</script>

<style lang="scss" module="$sty">
@import "~@/styles/mixin.scss";
.inVindicate {
    @include fillover;
    @include flexCenter;
    font-size: 30px;
    background: rgba(24, 144, 255, 0.15);
    border: 2px dashed #aaa;
}
</style>
