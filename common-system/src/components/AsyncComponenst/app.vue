<script>
import ErrorComponent from '@/components/ErrorComponent'
import LoadingComponent from './components/AppLoading'
import asyncComponent from './components/comp'
import mixins from '@/utils/compAppMixin'

export default asyncComponent({ LoadingComponent, ErrorComponent, mixins })
</script>
