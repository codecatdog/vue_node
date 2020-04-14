<template>
  <div>
    hello home~
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { device } from "../common/api/api";
@Component({})
export default class Home extends Vue {
  getInfoList() {
    // this.$axios.get('getInfoList?workshopCode=1&skip=0&count=-1', {})
    device.getInfoList({
      workshopCode: "1",
      skip: 0,
      count: -1
    });
  }
  getPlan() {
    // this.$axios.get('getPlan/?skip=0&count=-1', {})
    device.getPlan(
      {
        skip: 0,
        count: -1
      },
      ""
    );
  }

  mounted() {
    this.getInfoList();
    this.getPlan();
  }
}
</script>

<style>
</style>