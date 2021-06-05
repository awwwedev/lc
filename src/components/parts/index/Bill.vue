<template>
  <b-card class="shadow-sm mb-5" header="Ваши счета">
    <b-form>
      <b-form-group label="Счет за">
        <b-form-select v-model="formData.type">
          <b-form-select-option v-for="id in Object.keys(billTypes)" :key="id" :value="id">
            {{ billTypes[id] }}
          </b-form-select-option>
        </b-form-select>
      </b-form-group>
      <b-row cols-sm="1" cols-md="2">
        <b-col>
          <b-form-group label="От">
            <b-datepicker v-model="formData.date_from"/>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="До">
            <b-datepicker v-model="formData.date_to"/>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <b-table triped hover :items="bills" :fields="columns">
      <template #cell(actions)="{ item }">
        <a :href="item.href" download><b-icon icon="download"/></a>
      </template>
      <template #cell(type)="{ item }">
        {{ billTypes[item.type] }}
      </template>
    </b-table>
  </b-card>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import BillModel from "@/models/1c/Bill";
import RealtyObject from "@/models/1c/RealtyObject";

@Component({

})
export default class Bill extends Vue {
  bills = []
  columns = [
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
  formData = {} as { to: string, from: string, type: string, object_id: string }
  @Prop({}) currentRealty!: RealtyObject
  @Prop({}) billTypes!: { [key: number]: string }

  initBill (): void {
    const date = new Date()
    const staredDate = new Date(date.getFullYear(), date.getMonth(), 1)
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    this.formData = {
      date_from: this.getDateByFormat(staredDate),
      date_to: this.getDateByFormat(endDate),
      type: Object.keys(this.billTypes)[0]
    }


  }

  getDateByFormat (date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  }

  created(): void {
    this.initBill()
  }

  @Watch('currentRealty')
  watchCurrentRealty(realty: RealtyObject): void {
    this.formData.object_id = realty.id_1c

    BillModel.getList(this.formData).then(res => {
      this.bills = res.data
    })
  }

}
</script>

<style scoped>

</style>