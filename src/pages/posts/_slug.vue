<template>
  <v-container fluid>
    <template v-if="currentPost">
      {{ currentPost.fields.title }}
      <v-img
        :src="currentPost.fields.coverImage.fields.file.url"
        :alt="currentPost.fields.coverImage.fields.file.fileName"
        width="400"
        class="mx-auto"
      />
      {{ currentPost.fields.publishDate }}
      {{ currentPost.fields.body }}
    </template>
    <template v-else>
      <h1>Page NotFound</h1>
    </template>
  </v-container>
</template>



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
