<template>
  <v-row>
    <v-col :cols="12">
      <section class="index">
        <div v-for="(post, i) in posts" :key="i">
          <Card
            :key="i"
            :title="post.fields.title"
            :id="post.sys.id"
            :date="post.fields.publishDate"
            :icatch="setEyeCatch(post).url"
            :postLink="linkTo('posts', post)"
            :body="post.fields.body"
            :tags="post.fields.tags"
          />
        </div>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="5"
            :total-visible="7"
          ></v-pagination>
        </div>
      </section>
    </v-col>
  </v-row>
</template>

<script>
import Card from '~/components/card'

import { mapState, mapGetters } from 'vuex'

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
  computed: {
    ...mapState(['posts']),
    ...mapGetters(['setEyeCatch', 'linkTo']),
  },
}
</script>