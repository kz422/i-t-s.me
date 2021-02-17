<template>
<v-container fluid class="px-0 pb-0">
  <v-main class="main" :class="{mainm: $vuetify.breakpoint.xsOnly}">
    <v-col class="mt-8">
      <Top />
    </v-col>
  </v-main>
</v-container>
</template>

<script>
import Top from '~/components/Top'

export default {
  head() {
    return {
      title: 'home'
    }
  },
  components: {
    Top
  }
}
</script>

<style scoped>
.main{
  height: 85vh;
  /* background: #f9f9f9; */
  background-image: url("~@/assets/top5.png");
  background-size: cover;
  background-position: center bottom;
  /* background-size: 500px; */
  /* background-position: bottom; */
  background-color:rgba(255,255,255,0.2);
  background-blend-mode:lighten;
}
.mainm{
  height: 85vh;
  /* background: #f9f9f9; */
  background-image: url("~@/assets/top-mobile.png");
  background-size: cover;
  background-position: center bottom;
  /* background-size: 500px; */
  /* background-position: bottom; */
  background-color:rgba(255,255,255,0.2);
  background-blend-mode:lighten;
}
</style>
