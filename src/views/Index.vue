<template>
  <div class="container pt-5">
    <b-row cols="2" class="mb-5 align-items-stretch">
      <b-col sm="8">
        <b-card class="shadow-sm">
          <div class="mb-3">
            <h1>Ваши объекты</h1>
            <b-list-group>
              <b-list-group-item active>
                Офис № 23
              </b-list-group-item>
              <b-list-group-item >
                Ангар № 76
              </b-list-group-item>
            </b-list-group>
          </div>
          <p class="mb-0">
            Вы можете скачать договор для этого объекта по <a href="">ссылке</a>
          </p>
        </b-card>

      </b-col>
      <b-col sm="4">
        <b-card class="shadow-sm h-100">
         <div class="d-flex flex-column justify-content-between h-100 ">
           <div class="">
             <h3>Добро пожаловать Иванов И. И.</h3>
             <p>У вас есть вопросы? <a href="">Обратитесь в тех. поддержку</a></p>
           </div>

           <div class="d-flex justify-content-end">
             <b-button variant="secondary">Выход</b-button>
           </div>
         </div>
        </b-card>
      </b-col>
    </b-row>
    <b-card class="shadow-sm mb-5" header="Ваши счета">
      <b-table triped hover :items="bills" :fields="billsFields">
        <template #cell(actions)="">
          <a href=""><b-icon icon="download"/></a>
        </template>
      </b-table>
    </b-card>
    <b-card class="shadow-sm mb-5" header="Ваши задолжености">
      <b-table triped hover :items="debt" :fields="debtFields ">
        <template #cell(date)="data">
          c <b class="  ">{{ data.item.date_from }}</b> по <b>{{ data.item.date_to }}</b>
        </template>
        <template #cell(actions)="">
          <a href=""><b-icon icon="download"/></a>
        </template>
      </b-table>
    </b-card>
    <b-card class="shadow-sm mb-5" header="Ваши счетчики">
      <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">
        Вода
        <b-badge variant="primary" pill>345345</b-badge>
      </b-list-group-item>

      <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">
        Электричество
        <b-badge variant="primary" pill>456456</b-badge>
      </b-list-group-item>

      <b-list-group-item href="#" class="d-flex justify-content-between align-items-center">
        Газ
        <b-badge variant="primary" pill>145645</b-badge>
      </b-list-group-item>
    </b-card>
    <b-card class="shadow-sm mb-5" header="Ваша статистика">
      <BarChart :chart-data="chartData" :chartOptions="options"/>
    </b-card>
  </div>
</template>
<script lang="ts">
import BarChart from '@/components/charts/Bar.vue'
import {Component, Vue} from "vue-property-decorator";

@Component({
components: {BarChart}
})
export default class Index extends Vue {
  billsFields = [
    {
      key: 'type',
      label: 'Вид счета'
    },
    {
      key: 'date',
      label: 'За дату'
    },
    {
      key: 'value',
      label: 'Показание'
    },
    {
      key: 'actions',
      label: '  '
    }
  ]
  bills = [
    {
      type: 'Электричество',
      date: '01.05.2000',
      value: '745675'
    },
    {
      type: 'Газ',
      date: '01.05.2000',
      value: '567567'
    }
  ]
  debtFields = [
    {
      key: 'type',
      label: 'Вид счета'
    },
    {
      key: 'date',
      label: 'Период'
    },
    {
      key: 'actions',
      label: '  '
    }
  ]
  debt = [
    {
      type: 'Вода',
      date_from: '01.04.2000',
      date_to: '01.05.2000'
    }
  ]
  chartData = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    datasets: [
      {
        label: 'Data One',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
      }
    ]
  }
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
}
</script>
<style lang="stylus">

</style>