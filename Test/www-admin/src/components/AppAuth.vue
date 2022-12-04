<template lang="pug">
b-container.pt-3.pb-4
    b-row
      b-col(offset-sm="3" sm="6")
        h1 Авторизация
        b-form(@submit.prevent="handleLogin")
          b-form-group(label="Логин")
            b-form-input(type="text" v-model="form.login")
          b-form-group(label="Пароль")
            b-form-input(type="password" v-model="form.password")
          b-button(type="submit" variant="primary") Войти
</template>


<script>
  import { mapActions } from 'vuex';


  export default {
    data: () => ({
      form: {
        login: '',
        password: '',
      },
    }),

    methods: {
      ...mapActions('auth', ['login']),


      async handleLogin() {
        await this.login(this.form);
      },
    },
  };
</script>
