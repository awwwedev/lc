<template>
  <TrendChart v-if="preparedLabel.length && preparedData.length"
              :datasets="preparedData"
              :grid="{ verticalLines: true,  horizontalLines: true }"
              :labels="{ xLabels: preparedLabel, yLabels: preparedLabel.length, yLabelsTextFormatter: val => Math.round(val * 100) / 100 }"
              :min="0"
  />
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
// @ts-ignore
import TrendChart from "vue-trend-chart";
import {ChartData} from "@/common/types";


@Component({
  components: {TrendChart}
})
export default class LineChart extends Vue {
  @Prop({}) chartData!: Array<ChartData>
  @Prop({}) chartLabels!: Array<string>

  get preparedData (): Array<ChartData> {
    return this.chartData.map((value) => {
      return {...value, data: Object.values(value.data) as Array<number>} as unknown as ChartData
    }) as Array<ChartData>
  }
  get preparedLabel (): Array<string> {
    if (!this.chartData[0] || !this.chartData[0].data) return []

    return this.chartLabels.reduce((acc, value, idx) => {
      if (Object.keys(this.chartData[0].data).includes(idx + '')) {
        return [ ...acc, value ]
      }
      return acc
    }, [] as Array<string>)
  }
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