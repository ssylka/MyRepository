<template lang="pug">
  b-modal(title="Добавление занятия" ok-title="Добавить" cancel-title="Отмена" ref="modal" @ok="handleCreate" :ok-disabled="!valid")
    b-card.mb-4
      b(slot="header") Общая информация
      editor-lessons-create-info(v-model="info")
    b-button.mb-3(variant="success" @click="createSubject") Добавить предмет
    draggable(v-model="subjects")
      transition-group
        b-card.mb-3(v-for="(subject, index) in subjects" :key="subject.id")
          b-row(slot="header" align-v="center")
            b-col
              b Занятие {{ index + 1 }}
            b-col.text-right
              b-button(variant="danger" @click="removeSubject(index)") Удалить занятия
          editor-lessons-create-subject(v-model="subjects[index]")
</template>


<script>
  import { mapActions } from 'vuex';

  import * as Alert from 'services/alert';

  import Draggable from 'vuedraggable';
  import EditorLessonsCreateInfo from 'components/EditorLessonsCreateInfo';
  import EditorLessonsCreateSubject from 'components/EditorLessonsCreateSubject';


  export default {
    components: {
      Draggable,
      EditorLessonsCreateInfo,
      EditorLessonsCreateSubject,
    },

    computed: {
      valid() {
        return this.infoValid && this.subjectsValid;
      },

      infoValid() {
        const {
          weekDay,
          timeId,
          week,
          groupIds,
        } = this.info;

        if (!weekDay) return false;
        if (!timeId) return false;
        if (!week) return false;
        if (!groupIds.length) return false;

        return true;
      },

      subjectsValid() {
        if (!this.subjects.length) return false;
        if (!this.subjects.every(({
          empty,
          subjectId,
          teacherId,
          audienceId,
        }) => {
          if (empty) return true;
          if (!subjectId) return false;
          if (!teacherId) return false;
          if (!audienceId) return false;

          return true;
        })) return false;
        if (!this.subjects.some(({ empty }) => !empty)) return false;

        return true;
      },
    },

    data: () => ({
      info: {},
      subjects: [],
      subjectIdCounter: 0,
    }),

    methods: {
      ...mapActions('lessons', ['create']),


      show() {
        this.info = {
          weekDay: null,
          timeId: null,
          week: 'full',
          gradeId: null,
          groupIds: [],
        };

        this.subjects = [];
        this.subjectIdCounter = 0;

        this.createSubject();

        this.$refs.modal.show();
      },

      createSubject() {
        this.subjects.push({
          id: this.subjectIdCounter,
          empty: false,
          subjectId: null,
          teacherId: null,
          audienceId: null,
        });

        this.subjectIdCounter++;
      },

      removeSubject(index) {
        this.subjects.splice(index, 1);
      },

      handleCreate: Alert.wrapAsync(async function () {
        await this.create({
          info: this.info,
          subjects: this.subjects,
        });
      }, 'Занятие добавлено', 'Ошибка добавления занятия'),
    },
  };
</script>
