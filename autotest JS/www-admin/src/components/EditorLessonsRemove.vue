<template lang="pug">
  b-modal(title="Удаление занятия" ok-title="Удалить" cancel-title="Отмена" ref="modal" @ok="handleRemove(lessonId)" :ok-disabled="!lessonId")
    b-form-group(label="Курс")
      b-form-select(v-model="gradeId" :options="gradeNames")
    b-form-group(v-if="groups.length" label="Группа")
      b-form-select(v-model="groupId" :options="groupNames")
    b-form-group(label="День недели")
      b-form-select(v-model="weekDay" :options="weekDays")
    b-form-group(v-if="lessons.length" label="Занятие")
      b-form-select(v-model="lessonId" :options="lessonNames")
</template>


<script>
  import _ from 'lodash';

  import { mapGetters, mapActions } from 'vuex';

  import * as Alert from 'services/alert';

  import degrees from 'constants/degrees';
  import weekDays from 'constants/week-days';
  import weeks from 'constants/weeks';


  export default {
    data: () => ({
      weekDays,

      gradeId: null,
      groupId: null,
      weekDay: null,
      lessonId: null,
    }),

    computed: {
      ...mapGetters(['grades', 'groupsByGrade', 'lessonsByGroup']),


      groups() {
        return this.gradeId ? this.groupsByGrade(this.gradeId) : [];
      },

      lessons() {
        return this.groupId && this.weekDay ? this.lessonsByGroup(this.groupId).filter(({ weekDay }) => weekDay === this.weekDay) : [];
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

      lessonNames() {
        return this.lessons.map((lesson) => {
          const week = weeks[lesson.week] ? `${weeks[lesson.week]}, ` : '';
          const subjects = lesson.subjects.length ? ` (${_.uniq(lesson.subjects.map(({ name }) => name)).sort().join(', ')})` : '';

          return {
            value: lesson.id,
            text: `${week}${lesson.beginTime}${subjects}`,
          };
        });
      },
    },

    methods: {
      ...mapActions('lessons', ['remove']),
      ...mapActions(['fetchGroupsByGrade', 'fetchLessonsByGroup']),


      show() {
        this.gradeId = null;
        this.weekDay = null;

        this.$refs.modal.show();
      },


      handleRemove: Alert.wrapAsync(async function (id) {
        await this.remove({ id });
      }, 'Занятие удалено', 'Ошибка удаления занятия'),
    },

    watch: {
      async gradeId(gradeId) {
        this.groupId = null;

        if (!gradeId) return;

        await this.fetchGroupsByGrade({ gradeId });
      },

      async groupId(groupId) {
        this.lessonId = null;

        if (!groupId) return;

        await this.fetchLessonsByGroup({ groupId });
      },

      weekDay() {
        this.lessonId = null;
      },
    },
  };
</script>
