<template>
  <div
    class="loading-component"
    v-loading="loading"
    element-loading-text="组件正在拼命加载中..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  ></div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      loading: true
    }
  }
}
</script>

<style lang="scss">
.loading-component {
  width: 100%;
  height: 100%;
}
</style>
