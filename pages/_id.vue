<template>
  <v-container class="px-1 py-0">
    <Mypage />
  </v-container>
</template>

<script>
import Mypage from '~/components/Mypage'

export default {
  head() {
    return {
      title: 'MyPage'
    }
  },
  components: {
    Mypage
  }
}
</script>
