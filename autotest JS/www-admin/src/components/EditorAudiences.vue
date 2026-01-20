<template lang="pug">
  div
    b-button.mb-4(variant="success" @click="showCreate") Добавить аудиторию

    b-table.mb-0(striped hover fixed :fields="fields" :items="audiences" sort-by="name")
      template(slot="actions" slot-scope="data")
        b-button.mr-1(size="sm" @click="showUpdate(data.item)") Изменить
        b-button(size="sm" variant="danger" @click="handleRemove(data.item)") Удалить

    b-modal(title="Создание аудитории" ok-title="Сохранить" cancel-title="Отмена" ref="modalCreate" @ok="handleCreate(item)")
      b-form-group(label="Название")
        b-form-input(type="text" v-model="item.name")

    b-modal(title="Редактирование аудитории" ok-title="Сохранить" cancel-title="Отмена" ref="modalUpdate" @ok="handleUpdate(item)")
      b-form-group(label="Название")
        b-form-input(type="text" v-model="item.name")
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
      ...mapGetters(['audiences']),
    },

    methods: {
      ...mapActions('audiences', ['create', 'update', 'remove']),


      showCreate() {
        this.item = {
          name: '',
        };
        this.$refs.modalCreate.show();
      },

      showUpdate(item) {
        this.item = { ...item };
        this.$refs.modalUpdate.show();
      },


      handleCreate: Alert.wrapAsync(async function (item) {
        await this.create({ item });
      }, 'Аудитория создана', 'Ошибка создания аудитории'),

      handleUpdate: Alert.wrapAsync(async function (item) {
        await this.update({ id: item.id, item });
      }, 'Аудитория обновлена', 'Ошибка обновления аудитории'),

      handleRemove: Alert.wrapAsync(async function (item) {
        await this.remove({ id: item.id });
      }, 'Аудитория удалена', 'Ошибка удаления аудитории'),
    },
  };
</script>
