<template lang="pug">
  div
    b-button.mb-4(variant="success" @click="showCreate") Добавить предмет

    b-table.mb-0(striped hover fixed :fields="fields" :items="subjects" sort-by="name")
      template(slot="actions" slot-scope="data")
        b-button.mr-1(size="sm" @click="showUpdate(data.item)") Изменить
        b-button(size="sm" variant="danger" @click="handleRemove(data.item)") Удалить

    b-modal(title="Создание предмета" ok-title="Сохранить" cancel-title="Отмена" ref="modalCreate" @ok="handleCreate(item)")
      b-form-group(label="Название")
        b-form-input(type="text" v-model="item.name")
      b-form-group(label="Сокращение")
        b-form-input(type="text" v-model="item.abbr")

    b-modal(title="Редактирование предмета" ok-title="Сохранить" cancel-title="Отмена" ref="modalUpdate" @ok="handleUpdate(item)")
      b-form-group(label="Название")
        b-form-input(type="text" v-model="item.name")
      b-form-group(label="Сокращение")
        b-form-input(type="text" v-model="item.abbr")
</template>


<script>
  import { mapGetters, mapActions } from 'vuex';

  import * as Alert from 'services/alert';


  export default {
    data: () => ({
      fields: {
        name: {
          label: 'Название',
          sortable: true,
        },
        abbr: 'Сокращение',
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
      ...mapGetters(['subjects']),
    },

    methods: {
      ...mapActions('subjects', ['create', 'update', 'remove']),


      showCreate() {
        this.item = {
          name: '',
          abbr: '',
        };
        this.$refs.modalCreate.show();
      },

      showUpdate(item) {
        this.item = { ...item };
        this.$refs.modalUpdate.show();
      },


      handleCreate: Alert.wrapAsync(async function (item) {
        await this.create({ item });
      }, 'Предмет создан', 'Ошибка создания предмета'),

      handleUpdate: Alert.wrapAsync(async function (item) {
        await this.update({ id: item.id, item });
      }, 'Предмет обновлен', 'Ошибка обновления предмета'),

      handleRemove: Alert.wrapAsync(async function (item) {
        await this.remove({ id: item.id });
      }, 'Предмет удален', 'Ошибка удаления предмета'),
    },
  };
</script>
