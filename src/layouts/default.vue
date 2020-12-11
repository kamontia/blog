<template>
  <v-app light>
    <v-app-bar flat max-height=80>
      ぼっすんのぶろぐ
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fixed: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
