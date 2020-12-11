<template>
  <section class="index">
    <div v-for="(post, i) in posts" :key="i">
      <Card
        :key="i"
        :title="post.fields.title"
        :id="post.sys.id"
        :date="post.fields.publishDate"
        :tags="post.fields.tags"
        :src="post.fields.coverImage"
        :postLink="{ name: 'posts-slug', params: { slug: post.fields.slug } }"
      />
    </div>
    <div class="text-center">
      <v-pagination v-model="page" :length="3"></v-pagination>
    </div>
  </section>
</template>

<script>
import Card from '~/components/card'
import { createClient } from '~/plugins/contentful.js'

const client = createClient()
export default {
  transition: 'slide-left',
  components: {
    Card,
  },
  props: {
    page: {
      type: Number,
      default: 1,
    },
  },
  async asyncData({ env, params }) {
    console.log(env)

    let posts = []

    await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishDate',
      })
      .then((res) => {
        // console.log(res)
        posts = res.items
      })
      .catch(console.error)

    return { posts }
  },
}
</script>