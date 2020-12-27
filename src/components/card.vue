<template>
  <!-- <v-container> -->
  <nuxt-link :to="postLink" class="wrapper">
    <v-row no-gutters class="box line">
      <!-- 左：画像 -->
      <v-col lg="12" md="12" sm="12" cols="12" class="pa-2 icatch">
      <!-- <v-col > -->
        <img v-bind:src="icatch" class="icatch" />
      </v-col>

      <!-- 右：投稿サマリ -->
      <v-col xl="12" lg="12" class="pa-2">
        <div class="right-box">
          <v-row>
            <v-col>
              <div class="title">
                <h1>{{ title }}</h1>
              </div>
            </v-col>
          </v-row>
          <!-- <div class="body">{{ body | readmore }}</div> -->
          <v-row>
            <v-col>
              <div class="date">
                <v-icon left> mdi-calendar-clock </v-icon
                >{{ $format_date(date) }}
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <Tag :tags="tags"></Tag>
            </v-col>
          </v-row>

          <!-- <v-btn class="ml-2 mt-3 read-button" height="30px" outlined tile>
              記事を読む</v-btn
            > -->
        </div>
      </v-col>
    </v-row>
  </nuxt-link>
  <!-- </v-container> -->
</template>

<style scoped>
.wrapper {
  text-decoration: none;
}
.title {
  color: #3c3c3c;
}
.body {
  color: #3c3c3c;
}
.date {
  color: #3c3c3c;
}

.right-box {
  position: relative;
  height: 100%;
  /* line-height: 2.2rem; */
}
.read-button {
  position: absolute;

  bottom: 10px;
}
.box {
  margin: 0px;
}
.icatch {
  padding: 0px !important;
  object-fit: cover;
  width: 100%;
  height: 200px;
}
.line {
  border: 1px solid #303030;
}
</style>


<script>
import Tags from '@/components/tag'
export default {
  components: {
    Tags,
  },
  props: ['title', 'id', 'date', 'tags', 'icatch', 'postLink', 'body'],
  filters: {
    readmore: (text) => {
      if (!text) return ''
      return text.toString().substr(0, 50) + '...'
    },
  },
}
</script>
