<template>
  <div class="container pt-5">
    <BModal :visible="isOpenedSupportModal" @hidden="isOpenedSupportModal = false">
      <template #modal-header>
        <h3>Обращение в техподдержку</h3>
      </template>
      <template>
        <form>
          <b-form-group label="Сообщение">
            <b-form-textarea required rows="5" v-model="supportMessage"></b-form-textarea>
          </b-form-group>
        </form>
      </template>
      <template #modal-footer>
        <b-button variant="primary" @click="onSendSupportMessage" :disabled="!supportMessage.length">Отправить</b-button>
        <b-button variant="secondary" @click="isOpenedSupportModal = false">Отмена</b-button>
      </template>
    </BModal>
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
             <p>У вас есть вопросы? <a href="#" @click="isOpenedSupportModal = true">Обратитесь в тех. поддержку</a> </p>
             <p><a href="#">Ваши сообщения (5)</a></p>
           </div>

           <div class="d-flex justify-content-end">
             <b-button variant="secondary" @click="onLogout" >Выход</b-button>
           </div>
         </div>
        </b-card>
      </b-col>
    </b-row>
    <Bills v-if="currentRealty" :current-realty="currentRealty" :bill-types="billTypes"/>
    <Debts v-if="currentRealty" :current-realty="currentRealty" :bill-types="billTypes"/>
    <Counters v-if="currentRealty" :current-realty="currentRealty" :bill-types="billTypes"/>
    <Statistic v-if="currentRealty" :current-realty="currentRealty" :bill-types="billTypes"/>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import RealtyObject from "@/models/1c/RealtyObject";
import {mapGetters} from "vuex";
import User from "@/models/User";
import UserStore from "@/store/modules/user";
import Bills from "@/components/parts/index/Bills.vue";
import Debts from "@/components/parts/index/Debts.vue";
import Counters from "@/components/parts/index/Counters.vue";
import Statistic from "@/components/parts/index/Statistic.vue";
import LineChart from "@/components/charts/LineChart.vue";
import {getModule} from "vuex-module-decorators";
import http from "@/common/http";


@Component({
  components: {LineChart, Statistic, Counters, Debts, Bills},
  computed: {
    ...mapGetters({
      $user: 'user/getUser'
    })
  }
})
export default class Index extends Vue {
  realty = [] as Array<RealtyObject>
  isOpenedSupportModal = false
  currentRealty = null as null | RealtyObject
  $user!: User
  supportMessage = ''
  billTypes = {
    1: 'Вода',
    2: 'Электричество',
    3: 'Газ'
  }


  get userFio(): string {
    return this.$user.name as string
  }

  onSendSupportMessage(): void {
    this.isOpenedSupportModal = false
  }

  onLogout(): void {
    getModule(UserStore, this.$store).logout()

    delete http.defaults.headers['Authorization']
    this.$cookies.remove('token')
  }

  created(): void {
    RealtyObject.getList().then(res => {
      this.realty = res.data
      this.currentRealty = res.data[0]
    })
  }
}
</script>
<style lang="stylus">

</style>