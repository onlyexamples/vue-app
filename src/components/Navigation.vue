<template lang="pug">
  ul.nav(v-if="menuLinks")
    li.nav-item(v-for="link in menuLinks")
      router-link.nav-link(:to="link.url") {{link.title}}
    li.nav-item(v-if="isAuthenticated")
      a.nav-link(href="#" @click.prevent="signOut") Выход
</template>

<script>
export default {
  name: 'Navigation',

  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    },

    menuLinks () {
      if (this.isAuthenticated) {
        return [
          { title: 'Фотошкала', url: '/timeline' },
          { title: 'Профиль', url: '/profile' }
        ]
      }
      return [
        { title: 'Главная', url: '/' },
        { title: 'Вход', url: '/login' },
        { title: 'Регистрация', url: '/registration' }
      ]
    }
  },

  methods: {
    signOut () {
      this.$store.dispatch('signOut').then(() => this.$router.push('/login'))
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
