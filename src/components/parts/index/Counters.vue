<template>
  <b-card class="shadow-sm mb-5" header="Ваши счетчики" v-if="currentRealty">
    <b-list-group-item v-for="counter in counters" :key="counter.id" class="d-flex justify-content-between align-items-center">
      {{ billTypes[counter.type] }}
      <b-badge variant="primary" pill>{{ counter.value }}</b-badge>
    </b-list-group-item>
  </b-card>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";
import RealtyObject from "@/models/1c/RealtyObject";
import Counter from "@/models/1c/Counter";


@Component({
})
export default class Counters extends  Vue {
  @Prop({ type: Object, required: true }) currentRealty!: RealtyObject
  @Prop({ type: Object, required: true }) billTypes!: { [key: number]: string }
  counters = [] as Array<Counter>


  updateItems(): void {
    Counter.getList({
      object_id: this.currentRealty.id_1c as number,
      types: Object.keys(this.billTypes)
    }).then(res => {
      this.counters = res.data
    })
  }

  @Watch('currentRealty')
  watchCurrentRealty(): void {
    this.updateItems()
  }
}
</script>

<style scoped>

</style>