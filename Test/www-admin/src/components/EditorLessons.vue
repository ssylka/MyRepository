<template lang="pug">
  div
    b-button.mr-2(variant="success" @click="showCreate") Добавить занятие
    b-button(variant="danger" @click="showRemove") Удалить занятие

    editor-lessons-create(ref="modalCreate")
    editor-lessons-remove(ref="modalRemove")
</template>


<script>
  import EditorLessonsCreate from 'components/EditorLessonsCreate';
  import EditorLessonsRemove from 'components/EditorLessonsRemove';


  export default {
    components: {
      EditorLessonsCreate,
      EditorLessonsRemove,
    },

    methods: {
      showCreate() {
        this.$refs.modalCreate.show();
      },

      showRemove() {
        this.$refs.modalRemove.show();
      },
    },
  };
</script>
