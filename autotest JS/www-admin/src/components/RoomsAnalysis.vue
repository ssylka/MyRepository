<template lang="pug">
  b-card(no-body)
    line-chart(v-if="mydata" :chart-data="mydata" :options="opt")
    vue-good-table(:columns="fields" :rows="usageByWeek" ref="table")
      template(slot="table-row" slot-scope="props")
        span(v-if="props.column.field == 'actions'")
          b-btn(v-b-toggle="props.row.roomId" size="sm") Загруженность по дням
          b-collapse(:id="props.row.roomId" class="mt-2")
            b-card
        span(v-else) {{ props.formattedRow[props.column.field] }}
</template>


<script>
  import * as Api from 'services/api';
  import LineChart from 'components/LineChart';

  export default {
    components: { LineChart },
    data: () => ({
      fields: [
        {
          label: 'Действия',
          field: 'actions',
          width: '90%',
        },
        {
          label: 'Аудитория',
          field: 'name',
        },
        {
          label: 'Загруженность',
          field: 'totalusage',
        },
      ],
      mydata: null,
      opt: null,
      usage: [],
      usageByWeek: [],
    }),

    methods: {
      getUsageByWeek(usage) {
        const unique = new Set();
        usage.forEach((row) => {
          if (!unique.has(row.roomId)) {
            this.usageByWeek.push({
              roomId: row.roomId,
              name: row.name,
              totalusage: `${(Math.round((parseInt(row.totalusage, 10) / 72) * 100))} %`,
            });
          }
          unique.add(row.roomId);
        });
        return this.usageByWeek;
      },
    },

    async created() {
      this.mydata = {
        labels: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
        datasets: [
          {
            label: 'Загруженность аудиторий',
            backgroundColor: '#f87979',
            data: [40, 39, 10, 40, 39, 80, 40],
          },
        ],
      };
      this.opt = { responsive: true, maintainAspectRatio: false };
      this.usage = await Api.audiences.Usage();
      this.usageByWeek = this.getUsageByWeek(this.usage);
      console.log(this.usageByWeek);
    },
  };
</script>
