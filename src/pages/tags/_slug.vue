<template>
  <div>
    <breadcrumbs :add-items="addBreads" />
    <h1>{{ tag.fields.name }}</h1>
    <div v-for="(post, i) in relatedPosts">
      {{ post.fields.title }}

    </div>
  </div>
</template>

<script>
// import { createClient } from '~/plugins/contentful.js'

export default {
  asyncData({ payload, params, error, store, env }) {
    const tag =
      payload ||
      store.state.tags.find((tag) => {
        return tag.fields.slug.toUpperCase() === params.slug.toUpperCase()
      })

    if (tag) {
      const relatedPosts = store.getters.associatePosts(tag)
      return { tag, relatedPosts }
    } else {
      error({ statusCode: 400 })
    }
  },
  computed: {
    addBreads() {
      return [{ icon: 'mdi-tag-outline', text: 'タグ一覧', to: '/tags' }]
    },
  },
}
</script>