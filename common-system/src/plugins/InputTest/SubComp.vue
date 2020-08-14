<template>
  <div :class="$style.subPage">hello 我是插件内的一个插件，可以通过配置项来获取到我</div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  }
}
</script>

<style lang="scss" module>
.subPage {
  font-size: 20px;
  text-decoration: underline;
}
</style>
