<template lang="pug">
b-navbar(toggleable="md" type="dark" variant="dark")
    b-navbar-toggle(target="nav_collapse" type="dark")
    b-navbar-brand(to="/") Интерактивное расписание ЮФУ
    b-collapse(is-nav id="nav_collapse")
      b-navbar-nav(v-if="auth")
        b-nav-item(to="/editor") Редактор
        b-nav-item(to="/conflicts") Конфликты
        b-nav-item(to="/rooms") Работа с аудиториями
        b-nav-item(to="/settings") Настройки
      b-navbar-nav.ml-auto
        b-nav-item(href="/" target="_blank") Перейти к расписанию
        b-nav-item(v-if="auth" @click="logout") Выйти
</template>


<script>
  import { mapActions, mapGetters } from 'vuex';


  export default {
    computed: {
      ...mapGetters(['auth']),
    },

    methods: {
      ...mapActions('auth', ['logout']),
    },
  };
</script>
