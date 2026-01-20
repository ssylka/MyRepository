<template lang="pug">
  div
    b-form-group(label="День недели")
      b-form-select(v-model="value.weekDay" :options="weekDays")
    b-form-group(label="Время")
      b-form-select(v-model="value.timeId" :options="timeNames")
    b-form-group(label="Неделя")
      b-form-select(v-model="value.week" :options="allWeeks")
    b-form-group(label="Курс")
      b-form-select(v-model="value.gradeId" :options="gradeNames")
    b-form-group(v-if="groups.length" label="Группа")
      b-form-checkbox-group(v-model="value.groupIds" :options="groupNames" stacked)
</template>


<script>
  import { mapActions, mapGetters } from 'vuex';

  import degrees from 'constants/degrees';
  import weekDays from 'constants/week-days';
  import { allWeeks } from 'constants/weeks';


  export default {
    computed: {
      ...mapGetters(['grades', 'groupsByGrade', 'times']),


      groups() {
        return this.value.gradeId ? this.groupsByGrade(this.value.gradeId) : [];
      },


      timeNames() {
        return this.times.map(time => ({
          value: time.id,
          text: `${time.begin} - ${time.end}`,
        }));
      },

      gradeNames() {
        return this.grades.map(grade => ({
          value: grade.id,
          text: `${degrees[grade.degree]}, ${grade.num} курс`,
        }));
      },

      groupNames() {
        return this.groups.map(group => ({
          value: group.id,
          text: `${group.name}, ${group.num} группа`,
        }));
      },
    },

    data: () => ({
      weekDays,
      allWeeks,
    }),

    methods: {
      ...mapActions(['fetchGroupsByGrade']),
    },

    props: ['value'],

    watch: {
      'value.gradeId': async function (gradeId) {
        this.value.groupIds = [];

        if (!gradeId) return;

        await this.fetchGroupsByGrade({ gradeId });
      },

      value: {
        handler(value) {
          this.$emit('input', value);
        },
        deep: true,
      },
    },
  };
</script>
