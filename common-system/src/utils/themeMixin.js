export default {
  props: {
    componentList: {
      type: Object,
      default: () => ({})
    },
    isFinish: {
      type: Boolean,
      deafult: false
    },
    isApp: {
      type: Boolean,
      deafult: false
    }
  },
  computed: {
    pageInfo () {
      const layCop = Array.from({ length: this.compLength }).reduce((result, n, i) => {
        const key = `ly_id_${i + 1}`
        const pickedType = !!(this.componentList[key] && this.componentList[key]._checked)
        const isTerminal = !!(this.componentList[key] && this.componentList[key]._isTerminal)
        const inDisabled = !!(this.componentList[key] && this.componentList[key]._inDisabled)
        result[key] = {}
        if (this.componentList[key] && this.componentList[key].url) {
          result[key] = this.componentList[key]
        } else {
          result[key] = {
            url: ''
          }
        }
        result[key]._id = key

        // 主题的指令使用的数据
        result[key]._directiveData = {
          _id: key,
          // 三种状态， 第一种 (empty) 待配置 第二种 修改配置 (unfinished) 第三种 配置结束(finish)
          _status: this.isFinish ? 'finish' : (result[key].url ? 'unfinished' : 'empty'),
          _isApp: this.isApp, // app 状态时 要传递此参数
          _checked: pickedType,
          _isTerminal: isTerminal, // 指令 是否是终端在使用
          _inDisabled: inDisabled // 系统维护中！ inDisabled

        }
        result[key]._show = !!result[key].url

        return result
      }, {})
      return layCop
    }
  },
  methods: {
    handleClick (id, type) {
      // type === 'update' 更新配置参数
      this.$emit('chooseComponent', this.pageInfo[id], type)
    }
  }
}
