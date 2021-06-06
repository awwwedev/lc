<template>
  <b-form>
    <b-form-group label="Счет за">
      <b-form-select v-model="localValue.type">
        <b-form-select-option v-for="id in Object.keys(billTypes)" :key="id" :value="id">
          {{ billTypes[id] }}
        </b-form-select-option>
      </b-form-select>
    </b-form-group>
    <b-row cols-sm="1" cols-md="2">
      <b-col>
        <b-form-group label="От">
          <b-datepicker v-model="localValue.date_from"/>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="До">
          <b-datepicker v-model="localValue.date_to"/>
        </b-form-group>
      </b-col>
    </b-row>
  </b-form>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from "vue-property-decorator";


type config = { date_to: string, date_from: string, type: string }

@Component({

})
export default class DateTypeFilters extends Vue {
  @Prop({ type: Object, required: true }) value!: config
  @Prop({ type: Object, required: true }) billTypes!: { [key: number]: string }

  localValue = {} as config

  initDate (): void {
    const date = new Date()
    const staredDate = new Date(date.getFullYear(), date.getMonth(), 1)
    const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    this.localValue = {
      date_from: this.getDateByFormat(staredDate),
      date_to: this.getDateByFormat(endDate),
      type: Object.keys(this.billTypes)[0]
    }
  }

  getDateByFormat (date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  }

  created(): void {
    this.initDate()
  }

  @Emit('input')
  changedLocalValue(): config {
    return this.localValue
  }

  @Watch('localValue', { deep: true })
  watchLocalValue(): void {
    this.changedLocalValue()
  }
  @Watch('value')
  watchValue(value: config): void {
    this.localValue = value
  }
}
</script>

<style scoped>

</style>