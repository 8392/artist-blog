<script>
import LoadingComponent from '@/components/LoadingComponent'
import themeMixin from '@/utils/themeMixin'
import compAppMixin from '@/utils/compAppMixin'
export default {
    name: 'async-components',
    components: { LoadingComponent },
    inheritAttrs: false,
    props: {
        name: String,
        options: {
            type: Object
        },
        comp: {
            type: Object
        }
    },
    data() {
        return {
            asyncNode: LoadingComponent
        }
    },
    computed: {
        childProps() {
            const { props: propsList, propsResult } = this.options
            let componentProps
            if (propsResult) {
                componentProps = this.getProps(propsResult)
            } else {
                componentProps = this.getProps(propsList)
            }
            return componentProps
        }
    },
    render(h, context) {
        const Node = this.asyncNode
        const { attrs = {} } = this.options
        const childProps = this.childProps

        return <Node {...{ attrs: attrs, props: { ...childProps }, on: {} }}></Node>
    },
    methods: {
        getProps(propsList) {
            const componentProps = {}
            propsList.forEach(item => {
                let itemValue = item.value === undefined ? '' : item.value
                if (item.props && item.props.length > 0) {
                    itemValue = this.getProps(item)
                }
                componentProps[item.key] = itemValue
            })
            return componentProps
        }
    },
    watch: {
        comp: {
            immediate: true,
            handler(component) {
                if (!component.render) return
                // this.asyncNode = component
                this.asyncNode = {
                    extends: component,
                    mixins: [themeMixin, compAppMixin],
                    props: {
                        /* 扩展按钮权限 */
                        __permission__: {
                            type: [Array, String],
                            default: () => ([])
                        },
                        // 这个是需要在 header 里面动态传递的信息
                        __headers__: {
                            type: Object,
                            default: () => ({})
                        },
                        // 门户实例id
                        __portletInstanceId__: {
                            type: String,
                            default: ''
                        }
                    }
                }
            }
        }
    },
    errorCaptured(err, vm, info) {
        // console.error(`${this.data.id}异步组件出现了错误`)
        console.error(`${this.name}组件内出现了错误`)
        console.error(err)
        return false
    }
}
</script>
<style lang="scss">
</style>
