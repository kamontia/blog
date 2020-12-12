<template>
  <v-app>
    <div class="container">
      <header class="header">
        <div class="title">ぼっすんぶろぐ</div>
      </header>
      <div class="left"></div>
      <Menu class="menu"></Menu>
      <main class="main">
            <v-layout wrap>
              <v-main>
                <nuxt />
              </v-main>
            </v-layout>
      </main>
      <div id="adsense"></div>
      <div class="right"></div>
      <footer class="footer">
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </footer>
    </div>
  </v-app>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-rows: 80px 50px 250px auto 50px;
  grid-template-columns: 200px 1fr 300px;
  grid-template-areas:
    'header header header '
    'menu menu menu'
    'left   main   adsense'
    'left   main   right  '
    'footer footer footer ';
  min-height: 100vh;
  margin: 0 auto;
}
.header {
  grid-area: header;
  border: 1px solid #909090;
  display: flex;
  justify-content: center;
}
.left {
  grid-area: left;
  border: 1px solid #909090;
  border-top: 0px;
  border-bottom: 0px;
}
.menu {
  grid-area: menu;
  border: 1px solid #909090;
  border-left: 0px;
  border-top: 0px;
  border-right: 0px;
}
.main {
  grid-area: main;
  /* border: 1px solid #909090; */
}

.right {
  grid-area: right;
  border: 1px solid #909090;
  border-top: 0px;
  border-bottom: 0px;
}

.footer {
  grid-area: footer;
  border: 1px solid #909090;
}
#adsense {
  grid-area: adsense;
  border: 1px solid #909090;
  border-top: 0px;
}
</style>


<script>
import Footer from '../components/footer'
import Menu from '../components/menu'

export default {
  components: {
    Footer,
    Menu,
  },
  data() {
    return {
      fixed: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
