<template lang="pug">
  div
    b-form-checkbox(v-model="value.empty") Окно
    b-form-group.mt-3(v-if="!value.empty" label="Предмет")
      model-select(v-model="value.subjectId" :options="subjectNames")
    b-form-group(v-if="!value.empty" label="Преподаватель")
      model-select(v-model="value.teacherId" :options="teacherNames")
    b-form-group(v-if="!value.empty" label="Аудитория")
      model-select(v-model="value.audienceId" :options="audienceNames")
</template>


<script>
  import { mapGetters } from 'vuex';

  import { ModelSelect } from 'vue-search-select';


  export default {
    components: {
      ModelSelect,
    },

    computed: {
      ...mapGetters(['audiences', 'subjects', 'teachers']),


      subjectNames() {
        return this.subjects.map(subject => ({
          value: subject.id,
          text: subject.name,
        }));
      },

      teacherNames() {
        return this.teachers.map(teacher => ({
          value: teacher.id,
          text: teacher.name,
        }));
      },

      audienceNames() {
        return this.audiences.map(audience => ({
          value: audience.id,
          text: audience.name,
        }));
      },
    },

    props: ['value'],

    watch: {
      value: {
        handler(value) {
          this.$emit('input', value);
        },
        deep: true,
      },
    },
  };
</script>
