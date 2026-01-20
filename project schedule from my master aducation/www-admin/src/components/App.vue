<template lang="pug">
.app
    app-header.app__header
    router-view.app__content(v-if="auth")
    app-auth.app__content(v-if="!auth")
    app-footer.app__footer
    app-alerts.app__alerts
</template>


<script>
  import { mapActions, mapGetters } from 'vuex';

  import AppAlerts from 'components/AppAlerts';
  import AppAuth from 'components/AppAuth';
  import AppHeader from 'components/AppHeader';
  import AppFooter from 'components/AppFooter';


  export default {
    computed: {
      ...mapGetters(['auth']),
    },

    components: {
      AppAlerts,
      AppAuth,
      AppHeader,
      AppFooter,
    },

    methods: {
      ...mapActions(['fetchAuth']),
    },

    async created() {
      await this.fetchAuth();
    },
  };
</script>


<style lang="sass" scoped>
  .app
    display: flex
    flex-direction: column
    min-height: 100vh

    &__content
      flex: 1 0

    &__alerts
      position: fixed
      left: 1rem
      bottom: 0
</style>
