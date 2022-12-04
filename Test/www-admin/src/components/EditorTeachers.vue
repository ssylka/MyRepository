<template lang="pug">
  div
    b-button.mb-4(variant="success" @click="showCreate") Добавить преподавателя

    b-table.mb-0(striped hover fixed :fields="fields" :items="teachers" sort-by="name")
      template(slot="actions" slot-scope="data")
        b-button.mr-1(size="sm" @click="showUpdate(data.item)") Изменить
        b-button(size="sm" variant="danger" @click="handleRemove(data.item)") Удалить

    b-modal(title="Создание преподавателя" ok-title="Сохранить" cancel-title="Отмена" ref="modalCreate" @ok="handleCreate(item)")
      b-form-group(label="ФИО")
        b-form-input(type="text" v-model="item.name")
      b-form-group(label="Степень")
        b-form-input(type="text" v-model="item.degree")

    b-modal(title="Редактирование преподавателя" ok-title="Сохранить" cancel-title="Отмена" ref="modalUpdate" @ok="handleUpdate(item)")
      b-form-group(label="ФИО")
        b-form-input(type="text" v-model="item.name")
      b-form-group(label="Степень")
        b-form-input(type="text" v-model="item.degree")
</template>


<script>
  import { mapGetters, mapActions } from 'vuex';

  import * as Alert from 'services/alert';


  export default {
    data: () => ({
      fields: {
        name: {
          label: 'ФИО',
          sortable: true,
        },
        degree: 'Степень',
        actions: {
          label: 'Действия',
          thStyle: {
            width: '200px',
          },
        },
      },

      item: {},
    }),

    computed: {
      ...mapGetters(['teachers']),
    },

    methods: {
      ...mapActions('teachers', ['create', 'update', 'remove']),


      showCreate() {
        this.item = {
          name: '',
          degree: '',
        };
        this.$refs.modalCreate.show();
      },

      showUpdate(item) {
        this.item = { ...item };
        this.$refs.modalUpdate.show();
      },


      handleCreate: Alert.wrapAsync(async function (item) {
        await this.create({ item });
      }, 'Преподаватель создан', 'Ошибка создания преподавателя'),

      handleUpdate: Alert.wrapAsync(async function (item) {
        await this.update({ id: item.id, item });
      }, 'Преподаватель обновлен', 'Ошибка обновления преподавателя'),

      handleRemove: Alert.wrapAsync(async function (item) {
        await this.remove({ id: item.id });
      }, 'Преподаватель удален', 'Ошибка удаления преподавателя'),
    },
  };
</script>
