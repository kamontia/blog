<template>
  <div>
    <breadcrumbs />
    <h1>{{ category.fields.name }}</h1>

    <div v-for="(post, i) in relatedPosts" :key="i">
      {{ post.fields.category.name }}
      {{ post.fields.title }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  async asyncData({ params, payload, store, error }) {
    // console.log('Category:start')
    console.log(params)
    const category =
      payload ||
      (await store.state.categories.find((post) => {
        console.log(post)
        if (post.fields.slug == undefined) {
          return
        }

        return post.fields.slug.toUpperCase() === params.slug.toUpperCase()
      }))

    console.log(category)

    if (category) {
      console.log('Category:end')
      return { category }
    } else {
      console.log('Error')
      return error({ statusCode: 400 })
    }
  },
  computed: {
    relatedPosts() {
      return this.$store.getters.relatedPosts(this.category)
    },
    ...mapState(['categories']),
    ...mapGetters(['getCategories']),
  },
}
</script>