<template>
  <div>
      hello home~
      <router-view/>
  </div>
</template>

<script>
export default {
    methods: {
      getInfoList(){
        this.$axios.get('getInfoList?workshopCode=1&skip=0&count=-1', {})
      },
      getPlan() {
        this.$axios.get('getPlan/?skip=0&count=-1', {})
      }
    },
    mounted() {
      this.getInfoList()
      this.getPlan()
    }
}
</script>

<style>

</style>