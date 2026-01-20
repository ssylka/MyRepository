<template lang="pug">
  div
    p На данный момент поиск и бронирование аудитории реализованы на весь текущий семестр
    div(class="date_picker_area")
      smooth-picker(v-show="showPicker" ref="smoothPickerDay"  :data="dataDays" :change="dataDaysChange")
      smooth-picker(v-show="showPicker" ref="smoothPickerTime" :data="dataTimes" :change="dataTimesChange")
    b-button.mt-3(variant="success" size="sm" @click="findAudience") Применить
    div(class="result_area" v-bind:class="{ hidden: resultsHidden }")
      b-list-group(v-for="room in rooms" :key="room.id")
        b-list-group-item(:id="room.id" @click="selected=room.id" v-bind:class="{ active: isSelected(room.id) }") {{ room.name }}
    b-button.mt-3(variant="success" @click="lockAudience" size="sm" v-bind:class="{ hidden: resultsHidden }") Забронировать аудиторию

</template>


<script>
  import * as Api from 'services/api';


  export default {
    data() {
      return {
        showPicker: false,
        dataTimes: [
          {
            currentIndex: 2,
            list: ['8:00 - 9:35', '9:50 - 11:25', '11:55 - 13:30', '13:45 - 15:20', '15:50 - 17:25', '17:40 - 19:15'],
          },
        ],
        dataDays: [
          {
            currentIndex: 2,
            list: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
          },
        ],
        rooms: [],
        selected: 0,
        resultsHidden: true,
      };
    },
    methods: {
      dataDaysChange(gIndex, iIndex) {
        this.dataDays[0].currentIndex = iIndex;
      },
      dataTimesChange(gIndex, iIndex) {
        this.dataTimes[0].currentIndex = iIndex;
      },
      isSelected(i) {
        return i === this.selected;
      },
      lockAudience() {
        console.log(this.selected);
      },
      findAudience() {
        this.clearResults();
        const timeString = this.dataTimes[0].list[this.dataTimes[0].currentIndex];
        const bh = timeString.split(':')[0];
        const bm = timeString.split('-')[0].split(':')[1].trim();
        const eh = timeString.split('-')[1].split(':')[0].trim();
        const em = timeString.split(':')[2];

        Api.audiences.getForTimeCached(this.dataDays[0].currentIndex.toString(), bh, bm, eh, em).then((res) => {
          this.rooms = res.data;
          this.resultsHidden = false;
        });
        // Api.audience.getForTimeQuery(this.dataDays[0].currentIndex.toString(), bh, bm, eh, em).then((res) => {
        //   console.log('Query Result:');
        //   console.log(res);
        //   this.rooms = res.data;
        // });
      },
      clearResults() {
        this.rooms = [];
        this.selected = 0;
      },
    },
    mounted() {
      setTimeout(() => {
        this.showPicker = true;
      }, 200);
    },
  };
</script>


<style lang="sass">
  .result_area
    margin-top: 1rem !important
    max-height: 300px
    overflow-y: scroll

  .hidden
    display: none

  .smooth-picker.flex-box
    width: 30%

  .date_picker_area
    display: flex
    flex-direction: row
</style>
