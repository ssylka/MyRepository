<template lang="pug">
.alerts
    transition-group(name="alert-fade")
      b-alert(v-for="(alert, index) in alerts" :key="alert.timestamp" :variant="alert.variant" show) {{ alert.message }}
</template>


<script>
  import { mapGetters } from 'vuex';


  export default {
    computed: {
      ...mapGetters(['alerts']),
    },
  };
</script>


<style lang="sass" scoped>
  .alert-fade
    &-enter, &-leave-to
      opacity: 0
    &-enter-active, &-leave-active
      transition: opacity .3s
</style>

