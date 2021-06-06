<template>
  <b-card class="shadow-sm mb-5 card-chart" header="Ваша статистика" ref="cardChart">
    <b-form>
      <b-form-group label="Счет за">
        <b-form-select v-model="type">
          <b-form-select-option v-for="id in Object.keys(billTypes)" :key="id" :value="id">
            {{ billTypes[id] }}
          </b-form-select-option>
        </b-form-select>
      </b-form-group>
    </b-form>
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
  @Prop({ type: Object, required: true }) billTypes!: { [key: number]: string }
  @Ref('cardChart') $refCardChart!: HTMLElement
  chartWidth = 0
  chartData = [] as Array<ChartData>
  type = 1
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
      object_id: this.currentRealty.id_1c as number,
      type: this.type
    }).then(res => {
      const data = Array(12).fill(0) as Array<number>
      res.data.forEach(item => {
        data[+(item.date || '').split('-')[1]] = item.value as number
      })

      this.chartData = [
        {
          data,
          smooth: true,
          fill: true,
          showPoints: true,
          className: 'curve' + 1
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
  @Watch('type')
  watchType(): void {
    this.updateItems()
  }
}
</script>

<style scoped lang="stylus">
.card-chart {
  height 700px
}

</style>