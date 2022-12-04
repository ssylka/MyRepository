<template lang="pug">
  div
    b-button.mb-4(variant="success" @click="showCreate") Добавить группу

    b-table.mb-0(striped hover fixed :fields="fields" :items="groups")
      template(slot="grade" slot-scope="data") {{ gradeNames[data.item.gradeId] }}
      template(slot="actions" slot-scope="data")
        b-button.mr-1(size="sm" @click="showUpdate(data.item)") Изменить
        b-button(size="sm" variant="danger" @click="handleRemove(data.item)") Удалить

    b-modal(title="Создание группы" ok-title="Сохранить" cancel-title="Отмена" ref="modalCreate" @ok="handleCreate(item)")
      b-form-group(label="Номер")
        b-form-input(type="text" v-model="item.num")
      b-form-group(label="Название")
        b-form-input(type="text" v-model="item.name")
      b-form-group(label="Курс")
        b-form-select(v-model="item.gradeId" :options="gradeNames")

    b-modal(title="Редактирование группы" ok-title="Сохранить" cancel-title="Отмена" ref="modalUpdate" @ok="handleUpdate(item)")
      b-form-group(label="Номер")
        b-form-input(type="text" v-model="item.num")
      b-form-group(label="Название")
        b-form-input(type="text" v-model="item.name")
      b-form-group(label="Курс")
        b-form-select(v-model="item.gradeId" :options="gradeNames")
</template>


<script>
  import { mapGetters, mapActions } from 'vuex';

  import * as Alert from 'services/alert';

  import degrees from 'constants/degrees';


  export default {
    data: () => ({
      fields: {
        num: 'Номер',
        name: 'Название',
        grade: 'Курс',
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
      ...mapGetters(['grades', 'groups']),

      gradeNames() {
        return this.grades.map(grade => ({
          value: grade.id,
          text: `${degrees[grade.degree]}, ${grade.num} курс`,
        }));
      },
    },

    methods: {
      ...mapActions('groups', ['create', 'update', 'remove']),


      showCreate() {
        this.item = {
          num: '',
          name: '',
          gradeId: this.grades[0].id,
        };
        this.$refs.modalCreate.show();
      },

      showUpdate(item) {
        this.item = { ...item };
        this.$refs.modalUpdate.show();
      },


      handleCreate: Alert.wrapAsync(async function (item) {
        await this.create({ item });
      }, 'Группа создана', 'Ошибка создания гурппы'),

      handleUpdate: Alert.wrapAsync(async function (item) {
        await this.update({ id: item.id, item });
      }, 'Группа обновлена', 'Ошибка обновления группы'),

      handleRemove: Alert.wrapAsync(async function (item) {
        await this.remove({ id: item.id });
      }, 'Группа удалена', 'Ошибка удаления группы'),
    },
  };
</script>
