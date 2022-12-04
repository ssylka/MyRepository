<template lang="pug">
  b-container.pt-3.pb-4(fluid)
    h1.mb-3 Конфликты
    table-grouped.mb-0(striped hover fixed :fields="fields" :items="conflictsItems")
      template(slot="time" slot-scope="data") {{ weekDays[data.item.weekDay] }}, {{ data.item.beginTime }}
      template(slot="week" slot-scope="data") {{ allWeeks[data.item.week] }}
      template(slot="group" slot-scope="data")
        div(v-for="group in data.item.groups") {{ degrees[group.degree] }}, {{ group.grade }} курс, {{ group.name }}, {{ group.num }} группа
      template(slot="subject" slot-scope="data") {{ data.item.subject.name }}
      template(slot="teacher" slot-scope="data") {{ data.item.subject.teacher }}
      template(slot="audience" slot-scope="data") {{ data.item.subject.audience }}
      template(slot="actions" slot-scope="data")
        b-button(size="sm" variant="danger" @click="handleRemove(data.item)") Удалить
</template>


<script>
  import _ from 'lodash';

  import { mapActions, mapGetters } from 'vuex';

  import * as Alert from 'services/alert';

  import TableGrouped from 'components/TableGrouped';

  import degrees from 'constants/degrees';
  import { allWeeks } from 'constants/weeks';
  import weekDays from 'constants/week-days';


  export default {
    components: {
      TableGrouped,
    },

    data: () => ({
      fields: {
        time: 'Время',
        week: 'Неделя',
        group: 'Группа',
        subject: 'Предмет',
        teacher: 'Преподаватель',
        audience: 'Аудитория',
        actions: {
          label: 'Действия',
          thStyle: {
            width: '110px',
          },
        },
      },

      degrees,
      allWeeks,
      weekDays,
    }),

    computed: {
      ...mapGetters(['conflicts']),

      conflictsItems() {
        return _.reduce(_.groupBy(this.conflicts, item => `${item.weekDay} ${item.beginTime}`), (conflicts, lessons) => {
          const lessonsRowspan = lessons.reduce((sum, conflict) => sum + conflict.subjects.length, 0);

          lessons.forEach((lesson, lessonIndex) => {
            const subjectsRowspan = lesson.subjects.length;

            lesson.subjects.forEach((subject, subjectIndex) => {
              conflicts.push({
                ...lesson,
                subject,
                rowspan: {
                  week: subjectIndex === 0 ? subjectsRowspan : 0,
                  time: lessonIndex === 0 && subjectIndex === 0 ? lessonsRowspan : 0,
                  group: subjectIndex === 0 ? subjectsRowspan : 0,
                  actions: subjectIndex === 0 ? subjectsRowspan : 0,
                },
              });
            });
          });

          return conflicts;
        }, []);
      },
    },

    methods: {
      ...mapActions(['fetchConflicts']),
      ...mapActions('conflicts', ['remove']),


      handleRemove: Alert.wrapAsync(async function (item) {
        await this.remove({ id: item.id });
      }, 'Занятие удалено', 'Ошибка удаления занятия'),
    },

    async created() {
      await this.fetchConflicts();
    },
  };
</script>
