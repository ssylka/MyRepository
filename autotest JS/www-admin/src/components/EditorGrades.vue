<template lang="pug">
  div
    b-button.mb-4(variant="success" @click="showCreate") Добавить курс

    b-table.mb-0(striped hover fixed :fields="fields" :items="grades")
      template(slot="degreeName" slot-scope="data") {{ degrees[data.item.degree] }}
      template(slot="actions" slot-scope="data")
        b-button.mr-1(size="sm" @click="showUpdate(data.item)") Изменить
        b-button(size="sm" variant="danger" @click="handleRemove(data.item)") Удалить

    b-modal(title="Создание курса" ok-title="Сохранить" cancel-title="Отмена" ref="modalCreate" @ok="handleCreate(item)")
      b-form-group(label="Номер")
        b-form-input(type="text" v-model="item.num")
      b-form-group(label="Степень обучения")
        b-form-select(v-model="item.degree" :options="degrees")

    b-modal(title="Редактирование курса" ok-title="Сохранить" cancel-title="Отмена" ref="modalUpdate" @ok="handleUpdate(item)")
      b-form-group(label="Номер")
        b-form-input(type="text" v-model="item.num")
      b-form-group(label="Степень обучения")
        b-form-select(v-model="item.degree" :options="degrees")
</template>


<script>
  import { mapGetters, mapActions } from 'vuex';

  import * as Alert from 'services/alert';

  import degrees from 'constants/degrees';


  export default {
    data: () => ({
      degrees,
      fields: {
        num: 'Номер',
        degreeName: 'Степень обучения',
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
      ...mapGetters(['grades']),
    },

    methods: {
      ...mapActions('grades', ['create', 'update', 'remove']),


      showCreate() {
        this.item = {
          num: '',
          degree: Object.keys(this.degrees)[0],
        };
        this.$refs.modalCreate.show();
      },

      showUpdate(item) {
        this.item = { ...item };
        this.$refs.modalUpdate.show();
      },


      handleCreate: Alert.wrapAsync(async function (item) {
        await this.create({ item });
      }, 'Курс создан', 'Ошибка создания курса'),

      handleUpdate: Alert.wrapAsync(async function (item) {
        await this.update({ id: item.id, item });
      }, 'Курс обновлен', 'Ошибка обновления курса'),

      handleRemove: Alert.wrapAsync(async function (item) {
        await this.remove({ id: item.id });
      }, 'Курс удален', 'Ошибка удаления курса'),
    },
  };
</script>
