<template>
  <v-footer color="blue accent-2" padless>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="(link,i) in links"
        :key="i"
        color="white"
        text
        class="menu-button"
        :to="{ name: link.path }"
      >
        {{ link.title }}
      </v-btn>
    </v-row>
  </v-footer>
</template>

<style scoped>
.menu-button {
  margin-right: 30px;
}
</style>

<script>
export default {
  data: () => ({
    links: [
      {
        title: 'Home',
        path: 'index',
      },
      {
        title: 'Author',
        path: 'author',
      },
      // {
      //   title: 'Portfolio',
      //   path: '',
      // },
      // { title: 'Contact', path: '' },
    ],
  }),
}
</script>