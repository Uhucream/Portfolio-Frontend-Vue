<template>
  <v-app id="app">
    <v-app-bar
     app
     color='black'
     dark
     flat
     hide-on-scroll
    >
      <v-toolbar-title>Takashi</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>
        mdi-github-circle
      </v-icon>
    </v-app-bar>

    <v-main>
      <v-carousel
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(item,i) in carouselItems"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        ></v-carousel-item>
      </v-carousel>
      <v-container fluid>
        <v-subheader>About Me</v-subheader>
        <v-list
          flat
        >
          <v-row>
            <v-col>
              <v-card>
              </v-card>
            </v-col>
          </v-row>
        </v-list>
        <v-divider></v-divider>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'topPage',
  data () {
    return {
      carouselItems: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ]
    }
  }
}
</script>>
