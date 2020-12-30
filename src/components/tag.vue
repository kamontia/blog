<template>
  <div v-if="tags">
    <v-chip
      v-for="(tag, i) in tags"
      :key="i"
      class="tags"
      v-bind:color="tag.fields.color"
      label
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
export default {
  props: ['tags'],
}
</script>