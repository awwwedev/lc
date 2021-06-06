<template>
  <b-card class="shadow-sm mb-5 card-chart" header="Ваша статистика" ref="cardChart">
    <LineChart v-if="chartWidth" :chart-data="chartData" :chart-labels="labels"/>
  </b-card>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue, Watch} from "vue-property-decorator";
import BarChart from '@/components/charts/Bar.vue'
import $ from "jquery";
import StatisticModel from '@/models/1c/Statistic'
import RealtyObject from "@/models/1c/RealtyObject";
import LineChart from "@/components/charts/LineChart.vue";


type ChartData = {
  data: Array<number>,
  smooth: boolean,
  fill: boolean,
  showPoints: boolean,
  className: string,
}

@Component({
  components: {LineChart, BarChart},
})
export default class Statistic extends Vue {
  @Prop({type: Object, required: true}) currentRealty!: RealtyObject
  @Ref('cardChart') $refCardChart!: HTMLElement
  chartWidth = 0
  chartData = [] as Array<ChartData>
  labels = [
    'Январь',
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ]

  updateItems(): void {
    StatisticModel.getList({
      object_id: this.currentRealty.id_1c as number
    }).then(res => {
      console.log(res)
/*      this.chartData = res.data.map((item) => {
        return {
          data: item.data as Array<number>,
          smooth: true,
          fill: true,
          showPoints: true,
          className: 'curve' + item.type
        }
      })*/
      this.chartData = [
        {
          data: [34, 57, 56, 45, 67, 53, 4, 56, 456, 9, 8, 6],
          smooth: true,
          fill: true,
          showPoints: true,
          className: "curve1"
        },
        {
          data: [34, 86, 23, 45, 67, 53, 23, 56, 456, 9, 5, 6],
          smooth: true,
          fill: true,
          showPoints: true,
          className: "curve2"
        },
        {
          data: [34, 57, 26, 45, 67, 53, 25, 56, 456, 9, 56, 6],
          smooth: true,
          fill: true,
          showPoints: true,
          className: "curve3"
        }
      ]
    })
  }

  mounted(): void {
    this.$nextTick(() => {
      // @ts-ignore
      this.chartWidth = $(this.$refCardChart).find('.card-body').width() - 20 as number
    })
  }

  @Watch('currentRealty', {immediate: true})
  watchCurrentRealty(): void {
    this.updateItems()
  }
}
</script>

<style scoped lang="stylus">
.card-chart {
  height 600px
}

</style>