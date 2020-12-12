<template>
  <div v-if="currentPost">
    <!-- TODO: パンくずリスト入れる -->
    <v-row no-gutters>
      <v-col cols="12">
        <!-- ヘッダ部 -->
        <div class="wrap">
          <img
            :src="currentPost.fields.coverImage.fields.file.url"
            :alt="currentPost.fields.coverImage.fields.file.fileName"
            class="head-img"
          />
          <div class="icatch-title">
            <h1>{{ currentPost.fields.title }}</h1>
          </div>
          <div class="date">更新日:{{ currentPost.fields.publishDate }}</div>
          <div class="categories"></div>
        </div>

        <div class="content">
          {{ currentPost.fields.body }}
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

  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 15px;
  width: 80%;
}
.date {
  position: absolute;
  left: 5px;
  bottom: 5px;
}

.img-box {
  max-width: 100%;
  height: 100%;
  object-fit: cover;
}
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
</style>


<script>
import { createClient } from '~/plugins/contentful.js'

const client = createClient()
export default {
  props: {
    id: {
      type: String,
      default: '',
    },
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

    return { currentPost }
  },
}
</script>
