<template>
  <v-app dark align="center">
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
      <v-img width="400px" :src="require('@/assets/404.png')"></v-img>
    </h1>
    <h1 v-else>
      {{ otherError }}
      <v-img width="400px" :src="require('@/assets/error.png')"></v-img>
    </h1>
    <NuxtLink to="/">
      ホームへ戻る
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 ページが見つかりません！',
      otherError: 'エラーが起きたようです'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
