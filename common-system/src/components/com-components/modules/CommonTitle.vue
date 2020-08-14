<template>
    <div
        class="common-title"
        :to="{ path: $route.path }"
    >
        <h3 class="title-big">{{titleBig}}</h3>
        <h5 class="title-small">{{titleSmall}}</h5>
        <div class="title-downline"></div>
    </div>
</template>

<script>
export default {
    name: "banner-small",
    props: {
        titleBig: {
            type: String
        },
        titleSmall: {
            type: String
        },
    },
    data() {
        return {
        };
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// 管理类公共标题
.common-title {
    text-align: left;
    .title-big {
        font-size: 30px;
        font-weight: bold;
        color: rgba(31, 30, 52, 1);
        margin-bottom: 28px;
    }
    .title-small {
        font-size: 16px;
        font-weight: 400;
        color: rgba(31, 30, 52, 1);
        margin-bottom: 14px;
    }
    .title-downline {
        height: 1px;
        background: rgba(216, 216, 216, 1);
    }
}
</style>
