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
  background-image: url("~@/assets/top-2.png");
  background-size: cover;
  background-position: center bottom;
}
.mainm{
  height: 82vh;
  background-image: url("~@/assets/top-mobile-2.png");
  background-size: cover;
  background-position: center bottom;
}
</style>
