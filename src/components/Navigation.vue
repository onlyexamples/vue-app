<template lang="pug">
  ul.nav(v-if="user")
    li.nav-item
      router-link.nav-link(to='/timeline') Фотошкала
    li.nav-item
      router-link.nav-link(to='/profile') Профиль
    li.nav-item
      router-link.nav-link(to='/') Выход
  ul.nav(v-else="user")
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

  data () {
    return {
      user: true
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
</style>
