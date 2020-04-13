<template>
  <div>
      {{msg}}
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'this is my first node vue app!'
        }
    },
    methods: {
      getJuejinResources(){
        this.$axios.get('getInfoList?workshopCode=1&skip=0&count=-1', {})
      }
    },
    mounted() {
      this.getJuejinResources()
    }
}
</script>

<style>

</style>