<template>
  <div class="container pt-5">
    <b-row cols-sm="1" cols-md="2" class="mb-5 align-items-stretch">
      <b-col sm="8" class="" >
        <b-card class="shadow-sm">
          <div class="mb-3">
            <h1>Ваши объекты</h1>
            <b-list-group v-if="realty">
              <b-list-group-item  v-for="_realty in realty"
                                  :key="_realty.id"
                                  :active="currentRealty && currentRealty.id === _realty.id"
                                  @click="currentRealty = _realty"
                                  button
              >
                {{ _realty.name }}
              </b-list-group-item>
            </b-list-group>
          </div>
          <p class="mb-0" v-if="currentRealty">
            Вы можете скачать договор для этого объекта по <a :href="currentRealty.downloadContractHref" download>ссылке</a>
          </p>
        </b-card>
      </b-col>
      <b-col sm="4" class="">
        <b-card class="shadow-sm h-100">
         <div class="d-flex flex-column justify-content-between h-100 ">
           <div class="">
             <h3>Добро пожаловать {{ userFio }}</h3>
             <p>У вас есть вопросы? <a href="">Обратитесь в тех. поддержку</a></p>
           </div>

           <div class="d-flex justify-content-end">
             <b-button variant="secondary">Выход</b-button>
           </div>
         </div>
        </b-card>
      </b-col>
    </b-row>
    <Bill :current-realty="currentRealty" :bill-types="billTypes"/>
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
import {Component, Vue, Watch} from "vue-property-decorator";
import RealtyObject from "@/models/1c/RealtyObject";
import {mapGetters} from "vuex";
import User from "@/models/User";
import Bill from "@/components/parts/index/Bill.vue";

@Component({
  components: {Bill, BarChart},
  computed: {
    ...mapGetters({
      $user: 'user/getUser'
    })
  }
})
export default class Index extends Vue {
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
  options = {
    responsive: true,
    maintainAspectRatio: false
  }
  realty = [] as Array<RealtyObject>
  billTypes = {
    1: 'Вода',
    2: 'Электричество',
    3: 'Газ'
  }
  currentRealty = null as null | RealtyObject
  $user!: User

  get userFio(): string {
    return this.$user.name as string
  }

  created(): void {
    RealtyObject.getList().then(res => {
      this.realty = res.data
    })

  }

  @Watch('currentRealty')
  watchCurrentRealty(realty: RealtyObject): void {
    console.log(realty)
  }
}
</script>
<style lang="stylus">

</style>