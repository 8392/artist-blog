<script>
import LoadingComponent from '@/components/LoadingComponent'
import ErrorComponent from '@/components/ErrorComponent'
import asyncComponent from './components/comp'
import mixins from '@/utils/compMixin'

export default asyncComponent({ LoadingComponent, ErrorComponent, mixins })
</script>
