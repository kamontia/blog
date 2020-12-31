<template>
  <div v-if="tags">
    <v-chip
      v-for="tag in tags"
      :key="tag.sys.id"
      :to="linkTo('tags', tag)"
      class="ma-1"
      v-bind:color="tag.fields.color"
      label
      small
      link
      text-color="white"
    >
      <div class="storoke">
        <v-icon left> mdi-label </v-icon>
        {{ tag.fields.name }}
      </div>
    </v-chip>
  </div>
</template>

<style scoped>
.tags {
  margin-right: 10px;
}
.storoke {
  color: #fff;
}
</style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: ['tags'],
  computed: {
    ...mapGetters(['linkTo']),
  },
 
}
</script>