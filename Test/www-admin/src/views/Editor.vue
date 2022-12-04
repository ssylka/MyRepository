<template lang="pug">
  b-container.pt-3.pb-4(fluid)
    h1.mb-3 Редактор
    b-card(no-body)
      b-tabs(card v-model="tabIndex")
        b-tab(title="Преподаватели")
          editor-teachers
        b-tab(title="Аудитории")
          editor-audiences
        b-tab(title="Курсы")
          editor-grades
        b-tab(title="Группы")
          editor-groups
        b-tab(title="Предметы")
          editor-subjects
        b-tab(title="Занятия")
          editor-lessons
</template>


<script>
  import Promise from 'bluebird';
  import { mapActions } from 'vuex';

  import router from 'services/router';

  import EditorAudiences from 'components/EditorAudiences';
  import EditorGrades from 'components/EditorGrades';
  import EditorGroups from 'components/EditorGroups';
  import EditorLessons from 'components/EditorLessons';
  import EditorSubjects from 'components/EditorSubjects';
  import EditorTeachers from 'components/EditorTeachers';


  const tabs = ['teachers', 'audiences', 'grades', 'groups', 'subjects', 'lessons'];


  export default {
    components: {
      EditorAudiences,
      EditorGrades,
      EditorGroups,
      EditorLessons,
      EditorSubjects,
      EditorTeachers,
    },

    data: () => ({
      tabIndex: tabs[0],
    }),

    computed: {
      tab() {
        return tabs[this.tabIndex];
      },
    },

    methods: {
      ...mapActions([
        'fetchAudiences',
        'fetchGrades',
        'fetchGroups',
        'clearLessons',
        'fetchSubjects',
        'fetchTeachers',
        'fetchTimes',
      ]),

      openTab(tab) {
        this.tabIndex = tabs.indexOf(tab || tabs[0]);
      },
    },

    watch: {
      tab(tab) {
        router.push({
          name: 'editor',
          query: {
            tab,
          },
        });
      },

      $route: {
        handler(to) {
          this.openTab(to.query.tab);
        },
        deep: true,
      },
    },

    async created() {
      this.openTab(this.$route.query.tab);

      await Promise.all([
        this.fetchAudiences(),
        this.fetchGrades().then(() => this.fetchGroups()),
        this.clearLessons(),
        this.fetchSubjects(),
        this.fetchTeachers(),
        this.fetchTimes(),
      ]);
    },
  };
</script>
