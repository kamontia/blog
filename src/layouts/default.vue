<template>
  <v-app>
    <div class="wrap">
    <!-- <v-container :cols="10" :lg="10" :md="10"> -->
      <header class="header">
        <div class="title"><h1>へっぽこSEの備忘録</h1></div>
      </header>
      <div class="left d-none d-sm-flex"></div>
      <Menu class="menu"></Menu>
      <main class="main">
        <v-main>
          <!-- <v-container fluid> -->
          <nuxt />
          <!-- </v-container> -->
        </v-main>
      </main>
      <div id="adsense"></div>
      <div class="right"></div>
      <footer class="footer">
        <!-- <span>&copy; {{ new Date().getFullYear() }}</span> -->
        <Footer />
      </footer>
    <!-- </v-container> -->
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header {
  grid-area: header;
  border: 1px solid #909090;
  display: flex;
  justify-content: center;
  border-top: 0px;
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
  min-height: 100px;
}
#adsense {
  grid-area: adsense;
  border: 1px solid #909090;
  border-top: 0px;
}

@media screen and (min-width: 600px) {
  // スマホ 600px以上
  .wrap {
    display: grid;
    grid-template-rows: 80px 50px 250px auto 50px;
    grid-template-columns: 200px 1fr 300px;
    grid-template-areas:
      'header header header '
      'menu menu menu'
      'main   main   main'
      'main   main   main  '
      'footer footer footer ';
    min-height: 100vh;
    margin: 0 auto;
    padding: 0;
  }
  h1 {
    color: green;
  }
}

@media screen and (min-width: 1024px) {
  // タブレット、PC
  .wrap {
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
    margin: 0 50px;
    padding: 0;
  }
  h1 {
    color: red;
  }
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
