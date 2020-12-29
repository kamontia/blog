<template>
  <div v-if="currentPost">
    <!-- TODO: パンくずリスト入れる -->
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
          <div class="date">
            <v-icon left> mdi-calendar-clock </v-icon
            >{{ $format_date(currentPost.fields.publishDate) }}
          </div>

          <div class="tags">
            <Tag :tags="currentPost.fields.tags" />
          </div>
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
  position: absolute;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  left: 15px;
  bottom: 15px;
  border-radius: 5px;
}
.tags {
  position: absolute;
  right: 10px;
  bottom: 15px;
  margin-left: 10px;
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
import Tag from '@/components/tag'

const client = createClient()
export default {
  components: {
    Tag,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['setEyeCatch']),
  },
  transition: 'slide-right',
  async asyncData({ env, params }) {
    console.log(params)
    let currentPost = null

    await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        'fields.slug': params.slug,
      })
      .then((res) => {
        console.log(res.items[0])
        currentPost = res.items[0]
      })
      .catch(console.error)

    console.log(currentPost.fields.tags)

    return { currentPost }
  },
}
</script>
