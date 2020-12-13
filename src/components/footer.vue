<template>
  <v-footer v-bind="localAttrs" :padless="padless">
    <v-row justify="center" no-gutters>
      <v-col cols="12">
        <v-card outlined flat>
          <v-card
            flat
            tile
            width="100%"
            class="blue accent-2 text-center"
            min-height="100px"
          >
            <v-card-text class="white--text">
              Copyright © {{ new Date().getFullYear() }} - へっぽこSEの備忘録<strong></strong>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-footer>
</template>

<style scoped>
.theme--light.v-sheet--outlined {
  border: 0px;
}
v-row {
  min-height: 100%;
}
</style>

<script>
export default {
  data: () => ({
    icons: ['mdi-home', 'mdi-email', 'mdi-calendar', 'mdi-delete'],
    items: ['default', 'absolute', 'fixed'],
    padless: true,
    variant: 'default',
  }),
  computed: {
    localAttrs() {
      const attrs = {}

      if (this.variant === 'default') {
        attrs.absolute = false
        attrs.fixed = false
      } else {
        attrs[this.variant] = true
      }
      return attrs
    },
  },
}
</script>