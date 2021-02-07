<template>
  <v-container>
      <v-card class="card">
      <v-main align="center">
        <div class="top my-10">
          <v-avatar size="164" rounded="10">
            <v-img width="200px" :src="require('@/assets/avatar.jpg')"></v-img>
          </v-avatar>
          <h2>{{ this.name }}</h2>
          <v-row>
            <v-col>From : {{ this.born }}</v-col>
            <v-col>Graduated : {{ this.school }}</v-col>
          </v-row>
        </div>
          <v-divider></v-divider>
        <div class="intro my-10">
          <h2>Introduction</h2>
          <p>Hi,Im Erika</p>
          <p>Born and raised in CA</p>
          <p>Working for Microsoft as Software Engneer</p>
          <p>I like to trip around EU</p>
          <h2 class="mt-5">Career Path</h2>
          <v-timeline>
            <v-timeline-item align="left">timeline item</v-timeline-item>
            <v-timeline-item align="right">timeline item</v-timeline-item>
            <v-timeline-item align="left">timeline item</v-timeline-item>
            Now
          </v-timeline>
        </div>
          <v-divider></v-divider>
        <div class="sns my-10">
          <h2>My SNS</h2>
          <v-icon>mdi-instagram</v-icon>
          <v-icon>mdi-facebook</v-icon>
          <v-icon>mdi-twitter</v-icon>
          <v-icon>mdi-youtube</v-icon>
        </div>
          <v-divider></v-divider>
        <div class="links my-10">
          <h2>Links</h2>
          <a href="https://www.apple.com/jp/" target="_blank" style="text-decoration: none">
          HP
          </a>
        </div>
          <v-divider></v-divider>
        <div class="gallery my-10">
          <h2>Gallery</h2>
          <v-card
            elevation="24"
            max-width="444"
            class="mx-auto"
          >
          <v-carousel
            delimiter-icon="mdi-minus"
            height="300"
            :cycle="cycle"
            show-arrows-on-hover
          >
            <v-carousel-item
              v-for="(item,i) in items"
              :key="i"
              :src="item.src"
            ></v-carousel-item>
          </v-carousel>
          </v-card>
        </div>

      </v-main>
      </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cycle: true,
      born: 'Venice',
      school: 'M.I.T',
      name: 'Erika Brane',
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    }
  }
}
</script>

<style scoped>

.card {
  background-image: url("~@/assets/bg.jpg");
  background-size: cover;
}

</style>
