<template lang="pug">
  ul.nav(v-if="isAuthenticated")
    li.nav-item
      router-link.nav-link(to='/timeline') Фотошкала
    li.nav-item
      router-link.nav-link(to='/profile') Профиль
    li.nav-item
      a.nav-link(href="#" @click.prevent="signOut") Выход
  ul.nav(v-else="isAuthenticated")
    li.nav-item
      router-link.nav-link(to='/') Главная
    li.nav-item
      router-link.nav-link(to='/login') Вход
      | /
      router-link.nav-link(to='/registration') Регистрация
</template>

<script>
export default {
  name: 'Navigation',

  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },

  methods: {
    signOut () {
      this.$store.dispatch('signOut').then(() => this.$router.push('/'))
    }
  }
}
</script>

<style lang="postcss">
  .nav {
    display: flex;
    width: 100%;
    margin: 0;
    padding: 15px;
    justify-content: flex-end;
    align-items: center;
  }

  .nav-item {
    margin-right: 15px;
    list-style: none;
  }

  .nav-item:last-child {
    margin-right: 0;
  }

  .nav-link {
    text-decoration: none;
    color: currentColor;
    font-weight: bold;
    opacity: 0.7;
  }

  .nav-link.router-link-exact-active,
  .nav-link:hover {
    text-decoration: underline;
    opacity: 1;
  }

  .nav-link:focus {
    outline-color: var(--primary-color);
    outline-offset: 5px;
  }
</style>
