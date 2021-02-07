<template>
<v-container fluid class="px-0 pb-0">
  <v-main class="main">
    <v-col class="mt-12">
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
  background-image: url("~@/assets/bg2.jpg");
  background-size: cover;
}
</style>
