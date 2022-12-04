<template lang="pug">
  b-container.pt-3(fluid)
    b-btn(v-b-toggle="'collapse1'" variant="primary" size="sm") Подробнее о разделе сайта
    b-collapse(id="collapse1" class="mt-2")
      b-card
        p.mb-0 Для корректной работы данного раздела сайта, <b>справочники</b> должны быть в актуальном состоянии.<br>Для этого необходимо вызывать функции для их инициализации после внесения любых изменений в расписание.
    div
      b-btn.mt-3.mb-3(variant="success" size="sm") Вызвать функции инициализации
    b-card.mb-3(no-body)
      b-tabs(card)
        b-tab(title="Поиск и бронирование свободной аудитории")
          rooms-search
        b-tab(title="Анализ загруженности аудиторий")
          rooms-analysis
</template>


<script>
  import RoomsSearch from 'components/RoomsSearch';
  import RoomsAnalysis from 'components/RoomsAnalysis';


  export default {
    methods: {
      // TODO: Use API methods here.
      removeDBConflicts: () => console.log('removeDBConflicts'),
      setCurrentTerm: () => console.log('setCurrentTerm'),
    },
    components: {
      RoomsSearch,
      RoomsAnalysis,
    },
  };
</script>
