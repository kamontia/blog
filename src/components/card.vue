<template>
  <v-container>
    <!-- <v-row dense flat hover outlined tile>
      <v-col :key="1" :cols="4"> <v-img :src="src"></v-img></v-col>
      <v-card flat hover outlined tile height="200px">
        <v-col :key="2" :cols="8">
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-card-title class="headline" v-text="title"></v-card-title>

            <v-card-text>{{ body }}</v-card-text>
            <v-card-subtitle class="pb-0">{{ date }}}} </v-card-subtitle>

            <nuxt-link :to="postLink" class="wrapper">
              <v-btn class="ml-2 mt-3" height="40px" outlined tile right>
                記事を読む</v-btn
              >
            </nuxt-link>
          </div>
        </v-col>
      </v-card>
    </v-row> -->
    <v-row no-gutters class="box line">
      <v-col md="4" class="pa-2 icatch">
        <v-img v-bind:src="icatch" max-width="300px"></v-img>
      </v-col>
      <v-col md="89" class="pa-2">
        <div class="title">{{ title }}</div>
        <div class="body">{{ body | readmore }}</div>
        <div class="date">投稿日: {{ formate_date(date) }}</div>
        <nuxt-link :to="postLink" class="wrapper">
          <v-btn class="ml-2 mt-3" height="30px" outlined tile>
            記事を読む</v-btn
          >
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.box {
  margin: 0px;
}
.icatch {
  padding: 0px !important;
}
.line {
  border: 1px solid #303030;
}
</style>


<script>
export default {
  props: ['title', 'id', 'date', 'tags', 'icatch', 'postLink', 'body'],
  methods: {
    formate_date: (date) => {
      let formated_date = new Date(date).toISOString().slice(0, 10)
      return formated_date
    },
  },
  filters: {
    readmore: (text) => {
      if (!text) return ''
      return text.toString().substr(0, 20) + '...'
    },
  },
}
</script>
