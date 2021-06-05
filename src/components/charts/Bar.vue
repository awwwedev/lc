<script lang="ts">
import { Bar } from 'vue-chartjs'
import {Component, Mixins, Prop} from "vue-property-decorator";

@Component({
})
export default class BarChart extends Mixins<Bar>(Bar) {
  @Prop({ type: Object }) options!: any
  @Prop({ type: Object }) chartData!: any


  mounted (): void {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
<style lang="stylus">

</style>