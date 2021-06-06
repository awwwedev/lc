<template>
  <b-card class="shadow-sm mb-5" header="Ваши счета" v-if="currentRealty">
    <DateTypeFilters v-model="formData" :bill-types="billTypes"/>
    <b-table triped hover :items="items" :fields="columns">
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
import DateTypeFilters from "@/components/parts/index/DateTypeFilters.vue";


@Component({
  components: {DateTypeFilters}
})
export default class Bill extends Vue {
  @Prop({ type: Object, required: true }) currentRealty!: RealtyObject
  @Prop({ type: Object, required: true }) billTypes!: { [key: number]: string }

  formData = {} as { to: string, from: string, type: string }
  items = [] as Array<BillModel>
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
    BillModel.getList({
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