<template>
  <div v-if="currentPost">
    <!-- パンくずリスト -->
    <breadcrumbs :add-items="addbreads" />
    <v-row no-gutters>
      <v-col cols="12">
        <!-- ヘッダ部 -->
        <div class="wrap">
          <img
            :src="setEyeCatch(currentPost).url"
            :alt="setEyeCatch(currentPost).title"
            class="head-img"
          />
          <div class="icatch-title">
            <h1>{{ currentPost.fields.title }}</h1>
          </div>

          <v-container fluid>
            <v-row no-gutters>
              <v-col :cols="12" :xl="4" :lg="4" :md="12" :sm="12">
                <div class="date">
                  <v-icon left> mdi-calendar-clock </v-icon>
                  {{ $format_date(currentPost.fields.publishDate) }}
                </div>
              </v-col>

              <v-col :cols="12" :xl="8" :lg="8" :md="12" :sm="12">
                <div class="tags">
                  <Tag :tags="currentPost.fields.tags" />
                </div>
              </v-col>
            </v-row>
          </v-container>

          <div class="categories"></div>
        </div>
        <!-- SNS Share Button -->
        <div class="sns_share"></div>
        <div class="content">
          <div v-html="$md.render(currentPost.fields.body)"></div>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <!-- コンテンツ -->
      </v-col>
    </v-row>
  </div>
  <div v-else>
    <h1>Page NotFound</h1>
  </div>
</template>



<style scoped>
.wrap {
  position: relative;
}
.icatch-title {
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 20px;

  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  width: 80%;
  text-align: center;
}
.date {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 5px;
}
.tags {
  /* right: 10px; */
  /* margin-left: 0px */
  margin: 0 0 0 auto;
}

/* .img-box {
  max-width: 100%;
  height: 100%;
  object-fit: cover;
} */
.title-box {
  position: absolute;
  left: 10px;
  bottom: 10px;
  background-color: white;
}
.head-img {
  object-fit: cover;
  width: 100%;
  max-height: 300px;
}
.content {
  padding: 20px 50px;
}
li {
  color: #f00;
}
</style>


<script>
import { createClient } from '~/plugins/contentful.js'
import { mapGetters } from 'vuex'
import Tag from '@/components/ui/tag'

export default {
  components: {
    Tag,
  },
  props: [],
  computed: {
    ...mapGetters(['setEyeCatch', 'linkTo']),
    addbreads() {
      return [
        {
          icon: 'mdi-folder-outline',
          text: this.category.fields.name,
          to: this.linkTo('categories', this.category),
        },
      ]
    },
  },
  transition: 'slide-right',
  async asyncData({ params, payload, store, error }) {
    const currentPost =
      payload ||
      (await store.state.posts.find((post) => post.fields.slug === params.slug))
    
    if (currentPost) {
      return {
        currentPost,
        category: currentPost.fields.category,
      }
    } else {
      return error({ statusCode: 400 })
    }
  },
}
</script>
