<template>
  <!-- <article class="card">
      <h1 class="card_title">{{ title }}</h1>
      <p class="card_text">{{ id }}</p>
      <p class="card_date">{{ date }}</p>
    </article> -->
  <v-container>
    <v-row dense>
      <v-col>
        <v-card flat hover outlined tile max-width="680px" height="200px">
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline" v-text="title"></v-card-title>

              <v-card-actions class="ma-1">
                <v-avatar class="ma-3" size="100" tile>
                  <v-img :src="src"></v-img>
                </v-avatar>
                <!-- <v-card-subtitle v-text="item.subtitle"></v-card-subtitle> -->
                <v-card-text>aaaa</v-card-text>
                <v-card-subtitle class="pb-0"> Number 10 </v-card-subtitle>
                <nuxt-link :to="postLink" class="wrapper">
                  <v-btn
                    class="ml-2 mt-3"
                    height="40px"
                    outlined
                    tile
                    right
                    width="40px"
                  >
                    READ</v-btn
                  >
                </nuxt-link>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
export default {
  props: ['title', 'id', 'date', 'tags', 'src', 'postLink'],
}
</script>
