<template>
  <TrendChart :datasets="chartData"
              :grid="{ verticalLines: true,  horizontalLines: true }"
              :labels="{ xLabels: chartLabels, yLabels: chartLabels.length, yLabelsTextFormatter: val => Math.round(val * 100) / 100 }"
              :min="0"
  />
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
// @ts-ignore
import TrendChart from "vue-trend-chart";


@Component({
  components: {TrendChart}
})
export default class LineChart extends Vue {
  // eslint-disable-next-line
  @Prop({}) chartData!: Array<any>
  // eslint-disable-next-line
  @Prop({}) chartLabels!: Array<any>
}
</script>

<style scoped lang="stylus">
::v-deep {
  .curve1 {
    .stroke {
      stroke: #32a1d0;
      stroke-width: 2;
    }
    .fill {
      fill: #91daf9;
      opacity: 0.5;
    }
    .point {
      fill: #071a3c;
      stroke: #91daf9;
    }
  }
}
</style>