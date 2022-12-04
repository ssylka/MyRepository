<template lang="pug">
  b-container.pt-3.pb-4(fluid)
    h1.mb-3 Настройки
    b-form-group(label="Текущая неделя" horizontal)
      b-form-select(:value="week" :options="weeks" @change="week => updateWeek({ week })")
</template>


<script>
  import { mapGetters, mapActions } from 'vuex';

  import weeks from 'constants/weeks';


  export default {
    data: () => ({
      weeks,
    }),

    computed: {
      ...mapGetters(['week']),
    },

    methods: {
      ...mapActions([
        'fetchWeek',
        'updateWeek',
      ]),
    },

    async created() {
      await this.fetchWeek();
    },
  };
</script>
