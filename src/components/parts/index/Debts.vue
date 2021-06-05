<template>
  <b-card class="shadow-sm mb-5" header="Ваши задолжености" v-if="currentRealty">
    <DateTypeFilters v-model="formData" :bill-types="billTypes"/>
    <b-table triped hover :items="items" :fields="columns">
      <template #cell(type)="{ item }">
        {{ billTypes[item.type] }}
      </template>
      <template #cell(actions)="{ item }">
        <a :href="item.href"><b-icon icon="download"/></a>
      </template>
    </b-table>
  </b-card>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import DebtModel from "@/models/1c/Debt";
import DateTypeFilters from "@/components/parts/index/DateTypeFilters.vue";
import RealtyObject from "@/models/1c/RealtyObject";


@Component({
  components: {DateTypeFilters}
})
export default class Debt extends Vue {
  @Prop({}) billTypes!: { [key: number]: string }
  @Prop({}) currentRealty!: RealtyObject

  items = [] as Array<DebtModel>
  formData = {} as { to: string, from: string, type: string, object_id: string }
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

  updateItems(): void {
    DebtModel.getList({
      ...this.formData,
      object_id: this.currentRealty.id_1c as number
    }).then(res => {
      this.items = res.data
    })
  }

  @Watch('currentRealty')
  watchCurrentRealty(): void {
    this.updateItems()
  }
  @Watch('formData', { deep: true })
  watchFormData(): void {
    this.updateItems()
  }
}
</script>

<style scoped>

</style>